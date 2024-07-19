# Work IN Korea Front-end

## 프로젝트 실행 방법

1. 프로젝트의 node version 관리는 nvm을 이용합니다.
    1. homebrew를 통하여 nvm을 설치합니다.
        ```zsh
        brew install nvm
        ```
    2. shell profile에 nvm 로드 관련 설정 추가
        ```zsh
        vi ~/.profile 또는 vi ~/.zshrc

        export NVM_DIR="$HOME/.nvm"
        [ -s "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" ] && \. "$HOMEBREW_PREFIX/opt/nvm/nvm.sh" # This loads nvm
        [ -s "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$HOMEBREW_PREFIX/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion
        ```

2. 프로젝트의 dependency를 설치합니다.
    ```zsh
    yarn install
    ```

3. 로컬 개발 서버 실행
    ```zsh
    yarn dev
    ```

실행 완료 시 http://localhost:3000 에 접속하여 사용할 수 있습니다.

