import os
import sys
from setuptools import setup

setup(
    # package
    name='Lancamento manual',
    version='0.1',

    # metdata
    description='System ...',
    author='Vitor de Araujo',
    author_email='vitor.ecomp@gmail.com',
    url='',

    install_requires=['sqlalchemy', 'h5py', 'numpy', 'psycopg2']
)
