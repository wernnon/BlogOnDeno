

export default function Home() {
  return (
    <div>
      <div>
        <div class = 'login-container'>
          <div class = 'login-box'>
              <img
                src="/logo.svg"
                width="75%"
                height="75%"
                alt="the Fresh logo"
              />
            <div class='low-container'>
              <div class='titulo-2'> Bem vindo a plataforma de Login</div>
              <div class='buttons'>
                <div class='button'> 
                  <a href='/login'>
                    Entrar
                  </a>
                </div>
                <div class='button'>
                  <a href='/register'>
                    Cadastrar
                  </a>
                </div>
              </div>
            </div>  
          </div>    
        </div>
      </div>
    </div>
  );
}
