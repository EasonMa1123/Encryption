from setuptools import find_packages, setup

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name='ExponEncryption',
    version='0.5.0',
    author='Eason Ma',
    author_email='2easonma@gmail.com',  # Replace with your email
    description='A secure Python library for string encryption using exponential encryption algorithm',
    long_description=long_description,
    long_description_content_type="text/markdown",
    url='https://github.com/EasonMa1123/Encryption',  # Replace with your repository URL
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",  # We'll add MIT license
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
    ],
    python_requires='>=3.6',

)