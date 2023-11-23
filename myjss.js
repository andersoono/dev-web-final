function calcularComparacao() {
    var idade = parseFloat(document.getElementById("idade").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);

    
  
    var imc = calcularIMC(peso, altura);
  
    var planoBasicoA = 100 + (idade * 10 * (imc / 10));
    var planoStandardA = (150 + (idade * 15)) * (imc / 10);
    var planoPremiumA = (200 - (imc * 10) + (idade * 20)) * (imc / 10);
  
    var fatorComorbidade = calcularFatorComorbidade(imc);
  
    var planoBasicoB = 100 + (fatorComorbidade * 10 * (imc / 10));
    var planoStandardB = (150 + (fatorComorbidade * 15)) * (imc / 10);
    var planoPremiumB = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);
  
    exibirComparacao(planoBasicoA, planoStandardA, planoPremiumA, planoBasicoB, planoStandardB, planoPremiumB);

  var valoresOperadoraA = [planoBasicoA, planoStandardA, planoPremiumA];
  var valoresOperadoraB = [planoBasicoB, planoStandardB, planoPremiumB];

  var melhorPlanoOperadoraA = encontrarMelhorPlano(valoresOperadoraA);
  var melhorPlanoOperadoraB = encontrarMelhorPlano(valoresOperadoraB);

  exibirRecomendacao(melhorPlanoOperadoraA, melhorPlanoOperadoraB);
  }
  
  function calcularIMC(peso, altura) {
    return peso / (altura * altura);
  }
  
  function calcularFatorComorbidade(imc) {
    if (imc < 18.5) {
      return 10;
    } else if (imc >= 18.5 && imc < 24.9) {
      return 1;
    } else if (imc >= 25 && imc < 29.9) {
      return 6;
    } else if (imc >= 30 && imc < 34.9) {
      return 10;
    } else if (imc >= 35 && imc < 39.9) {
      return 20;
    } else {
      return 30;
    }
  }

  function exibirComparacao(basicoA, standardA, premiumA, basicoB, standardB, premiumB) {
    var tabelaComparativa = document.getElementById("tabelaComparativa");
    tabelaComparativa.innerHTML = `
    <div class="text-center">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Plano de Saúde A</th>
            <th>Plano de Saúde B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plano Básico</td>
            <td>$${basicoA.toFixed(2)}</td>
            <td>$${basicoB.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Plano Standard</td>
            <td>$${standardA.toFixed(2)}</td>
            <td>$${standardB.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Plano Premium</td>
            <td>$${premiumA.toFixed(2)}</td>
            <td>$${premiumB.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      </div>
    `;
  }

  function determinarMelhorPlano(basico, standard, premium) {
    var melhorPlano = "Básico";
    var menorValor = basico;
  
    if (standard < menorValor) {
      melhorPlano = "Standard";
      menorValor = standard;
    }
  
    if (premium < menorValor) {
      melhorPlano = "Premium";
    }
  
    return melhorPlano;
  }
  
  function encontrarMelhorPlano(valores) {
    var menorValor = Math.min(...valores);
    var melhorPlano = '';
  
    if (menorValor === valores[0]) {
      melhorPlano = 'Básico';
    } else if (menorValor === valores[1]) {
      melhorPlano = 'Standard';
    } else {
      melhorPlano = 'Premium';
    }
  
    return { nome: melhorPlano, valor: menorValor };
  }
  
  function exibirRecomendacao(melhorPlanoOperadoraA, melhorPlanoOperadoraB) {
    var paragrafoRecomendacao = document.getElementById("recomendacao");
  
    if (melhorPlanoOperadoraA.valor < melhorPlanoOperadoraB.valor) {
      paragrafoRecomendacao.textContent = `Com base nos cálculos, o plano mais barato é o "${melhorPlanoOperadoraA.nome}" da Operadora A com um valor de $${melhorPlanoOperadoraA.valor.toFixed(2)}.`;
    } else {
      paragrafoRecomendacao.textContent = `Com base nos cálculos, o plano mais barato é o "${melhorPlanoOperadoraB.nome}" da Operadora B com um valor de $${melhorPlanoOperadoraB.valor.toFixed(2)}.`;
    }
  }
  