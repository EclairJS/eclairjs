import sys
import os
import json
import inspect
import subprocess
import site

from setuptools import setup
from distutils import log
from distutils.command.install import install

VERSION='0.6-SNAPSHOT'
PACKAGE_NAME='eclairjs-nashorn'
BASEPATH = os.path.dirname(os.path.abspath(__file__))
JAR_FILE='eclairjs-nashorn-'+VERSION+'-jar-with-dependencies.jar'
JAR_FILE_PATH = os.path.join(BASEPATH, "target", JAR_FILE)
INSTALL_DIR = os.path.join(site.getsitepackages()[0], PACKAGE_NAME)

subprocess.call("mvn package -DskipTests -Pnotebook", shell=True)

svem_flag = '--single-version-externally-managed'
if svem_flag in sys.argv:
    # Die, setuptools, die.
    sys.argv.remove(svem_flag)
            
class install_with_kernelspec(install):
    def build_kernel_json(self):
        import toree
        toree_home = os.path.dirname(inspect.getfile(toree))
        jar = os.path.join(site.getsitepackages()[0], PACKAGE_NAME, JAR_FILE)

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
      version='0.1',
      description='jupyter toree kernel for eclairjs',
      url='https://github.com/eclairjs/eclairjs-nashorn',
      author='Brian Burns',
      author_email='brian.p.burns@gmail.com',
      license='Apache 2',
      install_requires=["IPython >= 4.0", "ipykernel", "toree"],
      cmdclass={'install': install_with_kernelspec},
      data_files=[
          (os.path.join(os.path.sep, PACKAGE_NAME),  [JAR_FILE_PATH])
      ],
      packages=[PACKAGE_NAME]
)
