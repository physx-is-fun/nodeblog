const moment = require('moment');
const crypto = require('crypto');

exports.generateDate = (date, format) => {
	return moment(date).format(format)
};

exports.isSelected = (selected, value) => {
    return selected == value ? "selected" : ""
};

exports.paginate = (options) => {
	let outputHTML = "";
	let pageNumber = Number(options.hash.pageNumber);
	let currentPage = Number(options.hash.currentPage);
	let search_query = options.hash.query.search_query ? options.hash.query.search_query : "";
	let category = options.hash.query.category ? options.hash.query.category : "";
	let heading = options.hash.query.heading ? options.hash.query.heading : "";
	if(currentPage == 1){
		outputHTML += `<li class="page-item disabled"><a class="page-link">Prev</a></li>`;
	} else {
		outputHTML += `<li class="page-item"><a class="page-link" href="?page=${currentPage - 1}&search_query=${search_query}&category=${category}&heading=${heading}">Prev</a></li>`;
	}
	let i = (currentPage > 4 ? currentPage - 2 : 1);
	if(i != 1){
		outputHTML += `<li class="page-item"><a class="page-link" href="?page=1&search_query=${search_query}&category=${category}&heading=${heading}">1</a></li>`;
		outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
	}
	for (; i<= (currentPage + 2) && i < pageNumber; i++){
		if(i == currentPage){
			outputHTML += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
		} else {
			outputHTML += `<li class="page-item"><a class="page-link" href="?page=${i}&search_query=${search_query}&category=${category}&heading=${heading}">${i}</a></li>`;
		}
		/*
		if(i == currentPage + 2 && i < pageNumber){
			outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
		}
		*/
	}
	if(currentPage + 3 < pageNumber && pageNumber > 5){
		outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
	}
	if(currentPage == pageNumber){
		outputHTML += `<li class="page-item active"><a class="page-link" href="?page=${pageNumber}&search_query=${search_query}&category=${category}&heading=${heading}">${pageNumber}</a></li>`;
		outputHTML += `<li class="page-item disabled"><a class="page-link">Next</a></li>`;
	} else {
		outputHTML += `<li class="page-item"><a class="page-link" href="?page=${pageNumber}&search_query=${search_query}&category=${category}&heading=${heading}">${pageNumber}</a></li>`;
		outputHTML += `<li class="page-item"><a class="page-link" href="?page=${currentPage + 1}&search_query=${search_query}&category=${category}&heading=${heading}">Next</a></li>`;
	}
	return outputHTML;
};

exports.gravatar = (context1, context2, options) => {
  const email = context1 || context2;
  const size = (typeof (options.hash.size) === 'undefined') ? 20 : options.hash.size;
  const hash = crypto.createHash('md5').update(email).digest('hex');
  return  `https://gravatar.com/avatar/${hash}?s=${size}&d=retro`;
};

exports.checked = (value, test) => {
    if (value == undefined) return '';
    return value==test ? 'checked' : '';
}

exports.truncate = (str, len) => {
    if(str.length > len){
		str = str.substring(0,len) + '...';
	}
	return str;
}