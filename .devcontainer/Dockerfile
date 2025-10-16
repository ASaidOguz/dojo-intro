FROM ubuntu:24.04

# 1. Install dependencies
RUN apt-get update && apt-get install -y \
    curl git bash build-essential libssl-dev zlib1g-dev \
    ca-certificates gnupg dirmngr coreutils wget jq \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Rust (minimum 1.85.0)
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN echo 'export PATH=$HOME/.cargo/bin:$PATH' >> ~/.bashrc

# 3. Install asdf
ENV ASDF_DIR=/root/.asdf
RUN git clone https://github.com/asdf-vm/asdf.git $ASDF_DIR --branch v0.14.0
ENV PATH="$ASDF_DIR/bin:$ASDF_DIR/shims:$PATH"
RUN echo '. $ASDF_DIR/asdf.sh' >> ~/.bashrc \
    && echo '. $ASDF_DIR/completions/asdf.bash' >> ~/.bashrc

# 4. Install Cairo with starkup (minimum 2.10.1)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh
ENV PATH="/root/.asdf/shims:${PATH}"
RUN echo 'export PATH=$HOME/.asdf/shims:$PATH' >> ~/.bashrc

# 5. Install Dojo toolchain via asdf
RUN bash -c ". $ASDF_DIR/asdf.sh \
    && asdf plugin add katana https://github.com/dojoengine/asdf-katana.git \
    && asdf plugin add torii https://github.com/dojoengine/asdf-torii.git \
    && asdf plugin add sozo https://github.com/dojoengine/asdf-sozo.git \
    && asdf install sozo 1.7.0 \
    && asdf install katana 1.7.0-alpha.4 \
    && asdf install scarb 2.12.2 \
    && asdf install torii 1.7.0 \
    && asdf global sozo  1.7.0 \
    && asdf global katana 1.7.0-alpha.4 \
    && asdf global torii 1.7.0 \
    && asdf global scarb 2.12.2"

# 6. Install Node.js and StarkNet Devnet via asdf
RUN bash -c ". $ASDF_DIR/asdf.sh \
    && asdf plugin add nodejs \
    && asdf install nodejs latest \
    && asdf global nodejs latest"

# 7. Install npm latest and pnpm latest
RUN bash -c ". $ASDF_DIR/asdf.sh \
    && npm install -g npm@latest \
    && npm install -g pnpm@latest"

# 8. Verify installs
RUN bash -c "source ~/.bashrc \
    && cargo --version \
    && scarb --version \
    && sozo --version \
    && katana --version \
    && torii --version \
    && node -v \
    && npm -v \
    && pnpm -v \
    && starknet-devnet --version"

CMD ["bash"]
