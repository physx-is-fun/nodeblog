/**************************************
    File Name: custom.js
    Template Name: Tech Blog
    Created By: HTML.Design
    http://themeforest.net/user/wpdestek
**************************************/


axios.defaults.baseURL = "http://localhost:3000";

(function($) {
    "use strict";
    $(document).ready(function() {
        $('#nav-expander').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
        $('#nav-close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');
        });
    });

    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $('.carousel').carousel({
        interval: 4000
    })

    $(window).load(function() {
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
    });

    jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.dmtop').css({bottom:"25px"});
        } else {
            jQuery('.dmtop').css({bottom:"-100px"});
        }
    });
    jQuery('.dmtop').click(function(){
        jQuery('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });

})(jQuery);


function openCategory(evt, catName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(catName).style.display = "block";
    evt.currentTarget.className += " active";
}

function onChangePassword() {
  const password = document.querySelector('input[name=password]');
  const confirmPassword = document.querySelector('input[name=confirmPassword]');
  if (confirmPassword.value === password.value) {
    confirmPassword.setCustomValidity('');
  } else {
    confirmPassword.setCustomValidity('Passwords do not match!');
  }
}

function onChangeEmail() {
  const email = document.querySelector('input[name=email]');
  const confirmEmail = document.querySelector('input[name=confirmEmail]');
  if (confirmEmail.value === email.value) {
    confirmEmail.setCustomValidity('');
  } else {
    confirmEmail.setCustomValidity('Emails do not match!');
  }
}

function axiosRequestHandler(){
	axios.defaults.headers.common['X-CSRF-TOKEN'] = document.getElementsByName("_csrf")[0].value;
	requestHandler();
}

function requestHandler(){
	document.getElementsByClassName("loader")[0].className = "loader loader-default is-active";
}

function responseHandler(){
	document.getElementsByClassName("loader")[0].className = "loader loader-default";
}

async function deletePost(id){
	try {
		if (confirm("Do you wish to delete the post?")){
			axiosRequestHandler();
			let res = await axios.delete(`/posts/${id}`); 		
			responseHandler();
			if (res.status){
				let path = window.location.pathname + window.location.search;
				if(path == '/admin/posts' || path == '/account/posts'){
					location.reload();
				} else {
					window.location = "/posts";
				}
			} else {
				responseHandler()
				throw new Error(res.statusText);
			}
		}
	} catch (error){
		responseHandler()
		throw new Error(error);
	}
}

function loadFile (event) {
	let output = document.getElementById('output');
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function() {
		URL.revokeObjectURL(output.src) // free memory
	}
}

function resetImage(){
	document.getElementById('output').src = "";
}

async function deleteProfile(){
	try {
		if (confirm("Do you wish to delete your profile?")){
			axiosRequestHandler();
			let res = await axios.delete('/account/profile'); 		
			responseHandler();
			if (res.status){
				window.location = "/";
			} else {
				throw new Error(res.statusText);
			}
		}
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
} 

async function updateCategory(id){
	try {
		let input = document.getElementById(id);
		if (!input.checkValidity()){
			input.setCustomValidity(input.validationMessage);
			input.reportValidity();
		} else if (confirm("Do you wish to update the category?")){
			axiosRequestHandler();
			let res = await axios.patch(`/categories/${id}`,{name: input.value}); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				responseHandler()
				throw new Error(res.statusText);
			}
		}			
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

async function deleteCategory(id){
	try {
		if (confirm("Do you wish to delete the category?")){
			axiosRequestHandler();
			let res = await axios.delete(`/categories/${id}`); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				throw new Error(res.statusText);
			}
		}
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

async function updateHeading(id){
	try {
		let input = document.getElementById(id);
		if (!input.checkValidity()){
			input.setCustomValidity(input.validationMessage);
			input.reportValidity();
		} else if (confirm("Do you wish to update the heading?")){
			axiosRequestHandler();
			let res = await axios.patch(`/headings/${id}`,{name: input.value}); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				responseHandler()
				throw new Error(res.statusText);
			}
		}			
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

async function deleteHeading(id){
	try {
		if (confirm("Do you wish to delete the heading?")){
			axiosRequestHandler();
			let res = await axios.delete(`/headings/${id}`); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				throw new Error(res.statusText);
			}
		}
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

async function updateTag(id){
	try {
		let input = document.getElementById(id);
		if (!input.checkValidity()){
			input.setCustomValidity(input.validationMessage);
			input.reportValidity();
		} else if (confirm("Do you wish to update the tag?")){
			axiosRequestHandler();
			let res = await axios.patch(`/tags/${id}`,{name: input.value}); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				responseHandler()
				throw new Error(res.statusText);
			}
		}			
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

async function deleteTag(id){
	try {
		if (confirm("Do you wish to delete the tag?")){
			axiosRequestHandler();
			let res = await axios.delete(`/tags/${id}`); 		
			responseHandler();
			if (res.status){
				location.reload();
			} else {
				throw new Error(res.statusText);
			}
		}
	} catch (error){
		responseHandler();
		throw new Error(error);
	}
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

console.log(getParameterByName('title'));