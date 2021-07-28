const contractDetails = {
	address: ethAddress,
	abi: [{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"uint256","name":"_loanAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"action","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"tokenName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
};

const bnbContractDetails = {
	address: bnbAddress,
	abi: [{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"uint256","name":"_loanAmount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[],"name":"action","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tokenName","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
};

async function loadWeb3() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	} else {
		window.alert('Se detectó un navegador que no es Ethereum. Instale MetaMask en su Browser.');
		return;
	}

	const networkId = await web3.eth.net.getId();
	const chainId = await web3.eth.getChainId();

	window.isBnb = false;

	// bsc 56
	if (networkId == 56 && chainId == 56) {
		window.contract = new window.web3.eth.Contract(bnbContractDetails.abi, bnbContractDetails.address);
		window.isBnb = true;
	}
	
	// eth
	else if (networkId == 1 && chainId == 1) {
		window.contract = new window.web3.eth.Contract(contractDetails.abi, contractDetails.address);
	}

 
 
	else {
		return alert('Se detectó una red no compatible. Seleccione una red compatible en MetaMask y vuelva a cargar la página. \n\nRedes admitidas:\n- Red principal de Ethereum Mainnet \n- Red principal de Binance Smart Chain Mainnet');
	}

	if (!window.contract) return alert('Error al cargar los datos del contrato');

	return window.web3.eth.getAccounts();
}