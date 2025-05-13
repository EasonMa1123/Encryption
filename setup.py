from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

with open("requirements.txt") as f:
    required = f.read().splitlines()

setup(
    name="ExponEncryption",
    version="0.0.1",
    description="""ExponEncryption is a powerful yet lightweight Python library designed for secure and efficient data encryption using exponential cryptographic techniques.
      Whether you're protecting sensitive user information, securing communications, or integrating encryption into your applications.
          ExponEncryption offers a seamless and intuitive API for developers of all skill levels.
            With its focus on speed, reliability, and ease of use, this library ensures that encrypting and decrypting data is both straightforward and highly secure. """,
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Eason Ma",
    packages=find_packages(include=["ExponEncryption"]),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires=required,
    license="MIT",
    url="https://github.com/EasonMa1123/Encryption",
)