
function AC_botaoCadastrarOnClick() {
	const cpnjInputValue = document.getElementById("cnpj-input").value;
	const enderecoInputValue = document.getElementById("endereco-input").value;
	const telefoneInputValue = document.getElementById("telefone-input").value;
	const emailInputValue = document.getElementById("email-input").value;
	const nomeInputValue = document.getElementById("nome-input").value;
	const senhaInputValue = document.getElementById("senha-input").value;
	const confirmarSenhaInputValue = document.getElementById("confirmar-senha-input").value;
	const logoInputValue = document.getElementById("logo-input").value;

	if (senhaInputValue != confirmarSenhaInputValue) {
		document.getElementById("confirmar-senha-msg-erro").style.display = "block";
	} else {
		document.getElementById("confirmar-senha-msg-erro").style.display = "none";

		const objetoResultado = {
			ong: {
				nome: nomeInputValue,
				cnpj: cpnjInputValue,
				endereco: enderecoInputValue,
				telefone: telefoneInputValue,
				email: emailInputValue,
				senha: senhaInputValue,
				logo: logoInputValue
			}
		}
		console.log(objetoResultado)
	}
}
