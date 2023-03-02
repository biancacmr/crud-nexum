$(document).ready(function () {
    // Cria e aplia as máscaras, já com restrição de limite de caracteres + only numbers (usando mask plugin)
    $('#cpf').mask('000.000.000-00');
    $('#cnpj').mask('00.000.000/0000-00');
    $('#cep').mask('00000-000');

    // Não permite a função colar nos inputs de cpf e cnpj
    $('#cpf-cnpj-input-group').bind("paste", function (e) {
        e.preventDefault();
    });

    // UF Select começa desativado para impedir o usuário de selecionar uma opção
    $('#uf').prop('disabled', true);

    // UF Select é ativado novamente no envio do formulário para ser enviado por POST para o BD
    $('#form-content').on('submit', function() {
        $('#uf').prop('disabled', false);
    });

    // Retonar a homepage
    $('#homepage').click(function(){
        window.location.href='/visualizar';
    })

    // Apaga os dados inseridos no cpf/cnpj quando outra opção é selecionada
    function clearCpfInput() { $('#cpf').val(""); }
    function clearCnpjInput() { $('#cnpj').val(""); }

    // Função que deixa visível o input de CPF e CPNJ dependendo da option seleciona na tag select user-type
    function getUserType(type) {

        // Quando a opção "Pessoa Física" é selecionada, o input de CPF se torna vísivel
        if (type == 'PESSOAFISICA') {
            $('#cpf-input').show();
            $('#cnpj-input').hide();
            clearCnpjInput();

            // Torna o campo de CPF obrigatório
            $('#cpf').prop("required", "true");
            $('#cnpj').prop("required", "false");
        }

        // Quando a opção "Pessoa Jurídica" é selecionada, o input de CNPJ se torna vísivel
        if (type == 'PESSOAJURIDICA') {
            $('#cnpj-input').show();
            $('#cpf-input').hide();
            clearCpfInput();

            // Torna o campo de CNPJ obrigatório
            $('#cpf').prop('required', "false");
            $('#cnpj').prop('required', "true");
        }

    }

    // Executa a função getUserType quando alguma opção da tag select é selecionada, e envia para ela o valor do select
    $(document).on('change', '#userType', function () {
        getUserType($(this).val());
    });

    // Validação do CPF (se ele é um cpf válido)
    $('#cpf').blur(function () {
        let cpf = $(this).val().replace(/\D/g, '').toString();

        if (cpf != "") {
            if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
                $('#cpf').css("border-color", "#ED2939");
                $('#cpf').css("--tw-ring-color", "transparent");
                alert('CPF inválido: ' + cpf);
                $('#cpf').val('');
                $('#cpf').focus();
            }
            else {
                if (cpf.length != 11) {
                    alert('CPF deve ter 11 dígitos.');
                    $('#cpf').val('');
                    $('#cpf').focus();
                    $('#cpf').css("border-color", "#ED2939");
                    $('#cpf').css("--tw-ring-color", "transparent");
                }
                else {
                    $('#cpf').css("border-color", "#d1d5db");
                    $('#cpf').css("--tw-ring-color", "#00e0d1");

                    let v = [];

                    //Calcula o primeiro dígito de verificação.
                    v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
                    v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
                    v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
                    v[0] = v[0] % 11;
                    v[0] = v[0] % 10;

                    //Calcula o segundo dígito de verificação.
                    v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
                    v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
                    v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
                    v[1] = v[1] % 11;
                    v[1] = v[1] % 10;

                    //Retorna Verdadeiro se os dígitos de verificação são os esperados.
                    if ((v[0] != cpf[9]) || (v[1] != cpf[10])) {
                        alert('CPF inválido: ' + cpf);
                        $('#cpf').val('');
                        $('#cpf').focus();
                    }
                }
            }
        }
        else {
            $('#cpf').css("border-color", "#d1d5db");
            $('#cpf').css("--tw-ring-color", "#00e0d1");
        }

    })

    // Validação do CNPJ (se ele é um cnpj válido)
    $('#cnpj').blur(function () {
        let cnpj = $(this).val().replace(/\D/g, '').toString();

        if (cnpj != "") {
            if (cnpj.length != 14) {
                alert('CNPJ deve ter 14 dígitos.');
                $('#cnpj').val('');
                $('#cnpj').focus();
                $('#cnpj').css("border-color", "#ED2939");
                $('#cnpj').css("--tw-ring-color", "transparent");
            }
            else {
                $('#cpf').css("border-color", "#d1d5db");
                $('#cpf').css("--tw-ring-color", "#00e0d1");

                let v = [];

                // Calcula o primeiro dígito de verificação
                v[0] = 5 * cnpj[0] + 4 * cnpj[1] + 3 * cnpj[2];
                v[0] += 2 * cnpj[3] + 9 * cnpj[4] + 8 * cnpj[5];
                v[0] += 7 * cnpj[6] + 6 * cnpj[7] + 5 * cnpj[8];
                v[0] += 4 * cnpj[9] + 3 * cnpj[10] + 2 * cnpj[11];
                v[0] = v[0] % 11;

                if (v[0] < 2)
                    v[0] == 0;
                else
                    v[0] = 11 - v[0];

                // Calcula o segundo dígito de verificação
                v[1] = 6 * cnpj[0] + 5 * cnpj[1] + 4 * cnpj[2];
                v[1] += 3 * cnpj[3] + 2 * cnpj[4] + 9 * cnpj[5];
                v[1] += 8 * cnpj[6] + 7 * cnpj[7] + 6 * cnpj[8];
                v[1] += 5 * cnpj[9] + 4 * cnpj[10] + 3 * cnpj[11] + 2 * v[0];
                v[1] = v[1] % 11;

                if (v[1] < 2)
                    v[1] == 0;
                else
                    v[1] = 11 - v[1];

                //Retorna Verdadeiro se os dígitos de verificação são os esperados
                if ((v[0] != cnpj[12]) || (v[1] != cnpj[13])) {
                    alert('CNPJ inválido: ' + cnpj);
                    $('#cnpj').val('');
                    $('#cnpj').focus();
                }
            }
        }
        else {
            $('#cnpj').css("border-color", "#d1d5db");
            $('#cnpj').css("--tw-ring-color", "#00e0d1");
        }

    })

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#cep").val("");
        $("#cidade").val("");
        $("#bairro").val("");
        $("#UF").val("");
        $("#logradouro").val("");
    }

    $('#cep').blur(function () {
        // Unmask and get the cep value entered by the user
        let cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            //Expressão regular para validar o CEP.
            let validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#logradouro").val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#logradouro").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP inválido.");
                    }

                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
                $('#cep').css("border-color", "#ED2939");
                $('#cep').css("--tw-ring-color", "transparent");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
            $('#cep').css("border-color", "#d1d5db");
            $('#cep').css("--tw-ring-color", "#00e0d1");
        }

    })

    $('#submit-btn').click(function submit(type) {
        if (!$('#name').val()) {
            $('#name').css("border-color", "#ED2939");
            $('#name').css("--tw-ring-color", "transparent");
        }
        else {
            $('#name').css("border-color", "#d1d5db");
            $('#name').css("--tw-ring-color", "#00e0d1");
        }

        if (!$('#email').val()) {
            $('#email').css("border-color", "#ED2939");
            $('#email').css("--tw-ring-color", "transparent");

        }
        else {
            $('#email').css("border-color", "#d1d5db");
            $('#email').css("--tw-ring-color", "#00e0d1");
        }

        if (!$('#cep').val()) {
            $('#cep').css("border-color", "#ED2939");
            $('#cep').css("--tw-ring-color", "transparent");

        }
        else {
            $('#cep').css("border-color", "#d1d5db");
            $('#cep').css("--tw-ring-color", "#00e0d1");
        }

        if (!$('#numero').val()) {
            $('#numero').css("border-color", "#ED2939");
            $('#numero').css("--tw-ring-color", "transparent");

        }
        else {
            $('#numero').css("border-color", "#d1d5db");
            $('#numero').css("--tw-ring-color", "#00e0d1");
        }

        if ($('#userType').val() == 'PESSOAFISICA') {
            if (!$('#cpf').val()) {
                $('#cpf').css("border-color", "#ED2939");
                $('#cpf').css("--tw-ring-color", "transparent");
            }
            else {
                $('#cpf').css("border-color", "#d1d5db");
                $('#cpf').css("--tw-ring-color", "#00e0d1");
            }
        }
        else {
            if (!$('#cnpj').val()) {
                $('#cnpj').css("border-color", "#ED2939");
                $('#cnpj').css("--tw-ring-color", "transparent");
            }
            else {
                $('#cnpj').css("border-color", "#d1d5db");
                $('#cnpj').css("--tw-ring-color", "#00e0d1");
            }
        }



    })

    $('#clear-btn').click(function () {
        $('#cnpj-input').hide();
        $('#cpf-input').show();

        $('#name').css("border-color", "#d1d5db");
        $('#name').css("--tw-ring-color", "#00e0d1");

        $('#email').css("border-color", "#d1d5db");
        $('#email').css("--tw-ring-color", "#00e0d1");

        $('#name').css("border-color", "#d1d5db");
        $('#name').css("--tw-ring-color", "#00e0d1");

        $('#cep').css("border-color", "#d1d5db");
        $('#cep').css("--tw-ring-color", "#00e0d1");

        $('#numero').css("border-color", "#d1d5db");
        $('#numero').css("--tw-ring-color", "#00e0d1");

        $('#cpf').css("border-color", "#d1d5db");
        $('#cpf').css("--tw-ring-color", "#00e0d1");

        $('#cnpj').css("border-color", "#d1d5db");
        $('#cnpj').css("--tw-ring-color", "#00e0d1");

    })

})

