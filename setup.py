import sys
import os
import json
import inspect
import subprocess
import site

from setuptools import setup
from distutils import log
from distutils.command.install import install
from distutils.sysconfig import get_python_lib

try:
    # Python 3
    from urllib.request import urlretrieve
except ImportError:
    # Python 2
    from urllib import urlretrieve

VERSION='0.6'
PACKAGE_NAME='eclairjs-nashorn'
JAR_FILE='eclairjs-nashorn-'+VERSION+'-jar-with-dependencies.jar'
JAR_FILE_PATH = os.path.join(PACKAGE_NAME, "jars", JAR_FILE)
INSTALL_DIR = os.path.join(get_python_lib(), PACKAGE_NAME)
MAVEN_URL = 'http://repo2.maven.org/maven2/org/eclairjs/eclairjs-nashorn/'+VERSION+'/'+JAR_FILE

urlretrieve(MAVEN_URL, JAR_FILE_PATH)

svem_flag = '--single-version-externally-managed'
if svem_flag in sys.argv:
    # Die, setuptools, die.
    sys.argv.remove(svem_flag)
            
class install_with_kernelspec(install):
    def build_kernel_json(self):
        import toree
        toree_home = os.path.dirname(inspect.getfile(toree))
        jar = os.path.join(INSTALL_DIR, "jars", JAR_FILE)

        kernel_json = {
                "name": "eclair",
                "display_name": "Spark 1.6.0 (EclairJS Toree)",
                "language": "javascript",
                "argv": [
                    os.path.join(toree_home, 'bin/run.sh'),
                    "--interpreter-plugin",
                    "eclair:org.eclairjs.nashorn.JavascriptInterpreter",
                    "--default-interpreter",
                    "eclair",
                    "--nosparkcontext",
                    "--profile",
                    "{connection_file}"
                    ],
                "env": {
                    "SPARK_OPTS": "--jars " + jar,
                    "SPARK_HOME": os.environ['SPARK_HOME']
                }
        }

        return kernel_json

    def run(self):
        install.run(self)
        user = '--user' in sys.argv
        kernel_json = self.build_kernel_json()
        try:
            from ipykernel.kerspec import install_kernel_spec
        except ImportError:
            from IPython.kernel.kernelspec import install_kernel_spec
        from IPython.utils.tempdir import TemporaryDirectory
        with TemporaryDirectory() as td:
            os.chmod(td, 0o755)  # Starts off as 700, not user readable
            with open(os.path.join(td, 'kernel.json'), 'w') as f:
                json.dump(kernel_json, f, sort_keys=True)
            log.info('Installing kernel spec')
            kernel_name = kernel_json['name']
            try:
                install_kernel_spec(td, kernel_name, user=user,
                                    replace=True)
            except:
                install_kernel_spec(td, kernel_name, user=not user,
                                    replace=True)


setup(name=PACKAGE_NAME,
      version=VERSION,
      description='jupyter toree kernel for eclairjs',
      url='https://github.com/eclairjs/eclairjs-nashorn',
      author='Brian Burns',
      author_email='brian.p.burns@gmail.com',
      license='Apache 2',
      install_requires=["IPython >= 4.0", "ipykernel", "toree"],
      cmdclass={'install': install_with_kernelspec},
      package_data={PACKAGE_NAME: ['jars/*']},
      packages=[PACKAGE_NAME]
)
