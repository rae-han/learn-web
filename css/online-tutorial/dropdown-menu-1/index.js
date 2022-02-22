function show(option) {
  // console.log(option);
  const optionValue = option.childNodes[1].textContent;
  document.querySelector('.textBox').value = optionValue;
  console.log(document.querySelector('.textBox'));
}

const dropdown = document.querySelector('.dropdown');
dropdown.onclick = function(){
  console.log('click dropdown')
  dropdown.classList.toggle('active');
}