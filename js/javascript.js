// Função que gerencia o quiz
$.fn.extend({
    quiz: function(json) {
      // Recebe os paramentros de questões e layout utilziado na página
      var questions = json['questions']
      var layout = json['layout'];

      // Define o Estilo do background da página
      $('body').css({
      //  backgroundImage:`url('img/${ layout['bg-img'] }')`,
      //  backgroundRepeat: "no-repeat",
      //  backgroundSize: "cover",
      //  backgroundPosition: "center",
      //  minHeight: "100vh"
      backgroundColor: layout['bg-color']
    });

      // Atribui o título correspondente
      $('title').html(layout['title']);

      $(function() {
        $('h1').css({
          color: layout['text-colors'][0],
          textAlign: "center",
          fontWeight: "700",
          textShadow: "rgba(0,0,0,0.5) 2px 3px 2px"
        });

        $('h3').css({
          color: layout['text-colors'][1],
          textAlign: "center",
          textShadow: "rgba(0,0,0,0.5) 2px 3px 2px"
        });

        $('.responsaveis').css({
          position: "relative",
          top: "25px",
          color: layout['text-colors'][2],
          textAlign: "center",
          fontSize: "0.8rem"
        });

        $('#optional').css({
          color: layout['text-colors'][2],
          textShadow: "rgba(0,0,0,0.5) 2px 3px 2px"
        });

        $('.links').css({
          fontWeight: "bold",
          cursor: "pointer",
          color: layout['text-colors'][2]
        });

        // Animações 
        $('#logo').hide();
        $('#logo').animate({height: 'toggle', opacity: '1'}, 200); 
        $("#info").hide();
        $("#info").animate({height: 'toggle', opacity: '1'}, 1000).delay(1000);

        $('#subinfo').hide().delay(1000);
        $('#subinfo').animate({height: 'toggle', opacity: '1'}, 'slow');
        

        $('#start-button').animate({left: '-=400', opacity: '0'}, 0).delay(2000);
        $('#start-button').animate({left: '+=400', opacity: '1'}, 700);
        
        $('.responsaveis').hide().delay(3000);
        $('.responsaveis').animate({height: 'toggle', opacity: '1'}, 'slow');

        // Inicia o Quiz
        $('#start-button').on('click', function() {
          index++
          $('.carousel-indicators').removeAttr('style');
          $('#carousel').carousel('next');
        });
        
        //Controle de slides;
        $('.select').on('click', function() {
            if (index <= questions.length) {
              if (index == questions.length) $('.carousel-indicators').hide();

            modal = ''
            // Faz a verificação das respostas
            if ($(this).val() == questions[index-1]['correct']['feedback']) {
              // Incrementa em caso de acerto
              correct++;
              modal = 
              `
              <div class="col">
                <div class="row d-flex justify-content-center">
                  <i class="far fa-check-circle icons" id="correct"></i>
                </div>
                <div class="row d-flex justify-content-center mt-2 mb-3">
                  <h2 class="title anwser">Correto!</h2>
                </div>
              
                ${ questions[index-1]['correct']['note'] }
              </div>
              `;
            } else {
              modal = 
              `
              <div class="col">
                <div class="row d-flex justify-content-center">
                  <i class="far fa-times-circle icons" id="false"></i>
                </div>
                <div class="row d-flex justify-content-center mt-2">
                  <h2 class="title anwser">Ops!</h2>
                </div>
                <div class="row d-flex justify-content-center mb-3">
                  A resposta correta é ${ questions[index - 1]['awnsers'][questions[index - 1]['correct']['feedback']]}
                </div>
              
                ${ questions[index-1]['correct']['note'] }
              </div>
              `;
              
            }
            if (index >= questions.length) {
              var percent = (correct / questions.length) * 100; 
              var optional = '';
              var result = 
              `
              Você acertou ${ correct } de ${ questions.length } (${ percent % 10 != 0 ? percent.toFixed(2) : percent }%) das questões. 
              `;

              var whatsapp = `https://api.whatsapp.com/send?text=Acertei ${ correct } questões no ${ layout['title'] } Monsenhor - Gil. Disponível no link `;
              var facebook = `https://www.facebook.com/sharer/sharer.php?u=https://carlosdaniel0.github.io/jogos_saude/`;
              var twitter = `https://twitter.com/intent/tweet?text=Acertei ${ correct } questões no ${ layout['title'] } Monsenhor - Gil. Disponível no link `;

              $('#result').html(result);
              
              if (percent == 100) {
                optional = 'Parabéns você está <i>expert</i> no assunto. Já que você acertou todas as perguntas que tal compartilhar com seus amigos e desafiá-los';
                
              } else if (percent >= 70) {
                optional = 'Muito bom! Você está quase lá, o que acha de tentar novamente para gabaritar e compartilhar com os amigos?'
              } else if (percent > 30 && percent < 70) {
                optional = 'Está quase lá! Parece que você errou algums questões, mas não desamine. Tente novamente e melhore sua pontuação!'
              } else {
                optional = 'Que pena! Parece que você acertou menos de 30% do quiz, que tal tentar novamente com os conhecimentos que vocẽ adquiriu?'
              }
              $('#optional').html(optional);

              // Compartilhar conteúdo
              $('#twitter').attr('href', twitter);
              $('#whatsapp').attr('href', whatsapp);
              $('#facebook').attr('href', facebook);
            }

            index++
            // Modal
            $('#content').html( modal);
            $('#modal').modal('show');

            // Avançar
            // Botão
            $('#next').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
            // Botão de Fechar
            $('.close').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
            // Clicando fora do modal
            $('.modal').click(function() {
              $('#carousel').carousel('next');
              $('#modal').modal('hide');
            });
          } 
        });
    });
    
    var index = 0;
    var correct = 0;
    var items = '';
    // Links de responsáveis 
    var i_responsaveis = ''
    for (var i = 0; i < layout['responsaveis']['title'].length; i++) {
      i_responsaveis += `<a href="${ layout['responsaveis']['links'][i] }" class="links">${ layout['responsaveis']['title'][i] }</a> </br>`
    }

    var responsaveis = 
    `
    <div class="responsaveis">
      Atividade: </br>
      Alunos do curso Técnico em Informática pelo PRONATEC/SEDUC-PI</br>
      Turma Monsenhor Gil - PI
      </br></br>
      Colaboradores: </br>
        ${ i_responsaveis }
    </div>
    `;

    indexes = `<li data-target="#carousel" class=" not-visible active"></li>`;
      items += 
      `
      <div class="carousel-item active">
          <div class="item">
            <div class="col-12">
              <h1 id="info">${ layout['text'] }</h1>
              <h3 id="subinfo">${ layout['subtitle'] }</h3>
              <div class="row d-flex justify-content-center mt-4">
                <button class="button ${ layout['color'] } avancar" id="start-button">Iniciar</button>
              </div>
              ${ responsaveis }
            </div>
          </div>
      </div>
      `;
    for (var i in questions) {                
            indexes += `<li data-target="#carousel" data-id="${ i } class="item-inner"></li>`;
            items += 
            `
            <div class="carousel-item">
              <div class="container d-flex justify-content-center">
                  <img src="img/${questions[i]['img']}" class="img img-fluid" alt="...">
                  <div class="carousel-caption ">
                      <div class="row d-flex justify-content-center">
                          <button class="btn btn-primary col-md-3 mr-2 mt-2 select" value="0" >${ questions[i]['awnsers'][0] }</button>
                          <button class="btn btn-warning col-md-3 mr-2 mt-2 select" value="1" >${ questions[i]['awnsers'][1] }</button>
                          <button class="btn btn-info col-md-3 mr-2 mt-2 select" value="2" >${ questions[i]['awnsers'][2] }</button>
                      </div>
                  </div>
              </div>
            </div> 
            `;
    }
    
      // Página de resultados
      indexes += `<li data-target="#carousel" class="not-visible"></li>`;
      items += 
      `
        <div class="carousel-item">
          <div class="item">
            <div class="col">
              <div class="row d-flex justify-content-center">
                <h1 id="result" class="mt-4"></h1>
              </div>
              <div class="row">
                <h3 id="result d-flex justify-content-center"></h3>
              </div>
              <div class="row d-flex justify-content-center">
                <span id="optional"></span>
              </div>
              <div class="d-flex justify-content-center">
                <b style="color: ${ layout['text-colors'][2] }">Desafie seus amigos: </b>
              </div>
              <row class="d-flex justify-content-center mt-2">
                <a id="facebook" class="network mr-2 d-flex justify-content-center" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a id="whatsapp" class="network mr-2 d-flex justify-content-center" target="_blank">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a id="twitter" class="network d-flex justify-content-center" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </row>
              ${ responsaveis }
            </div>
          </div>
        </div>
      `;

    var pattern = 
    `
    <div id="carousel" class="carousel slide" data-touch="false" data-interval="false">
        <ol class="carousel-indicators" style="display: none">
          ${ indexes }
        </ol>
        <div class="carousel-inner">
          ${ items }
        </div>
      </div>
    </div>
    <!-- End Caroussel -->

    <!-- Modal -->
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <section id="content"></section>
            <div class="row d-flex justify-content-center">
              <button type="button" class="btn btn-primary mt-4" id="next">Próxima</button>
            </div>
          </div>
          
        </div>
      </div>
    `;

      $(this).html(pattern);        
    },
});

var quiz = location.search.slice(1).split("&");
var cases = ['covid', 'obesidade'];
var existe = 0;

// quiz.forEach(function(data) {
//   if (quiz == '') {
//     window.location.assign('/jogos_saude/');
//   } else {
//     for (var i in cases) {
//       if (data == cases[i]) {
//         existe++
//       } 
//     }
//   }
  
//   if (existe != 0) {
//     quiz = data
//   } else {
//     window.location.assign('/jogos_saude/');
//   }
// });

 
$.getJSON(`data/data.json`, function(response) {
  $(function() {
    $('.container-fluid').quiz(response);
  });
})



