var mainPage = {
	totalProductCount : 0,

	init : function() {
		this.getCategories();
		this.getProducts('');
	},

	eventListener : function() {

	},

	getProducts : function(id) {
		$.ajax({
			url : "/api/products",
			data : {
				categoryId: id
			},
			type: "GET",
			dataType: "json"
		}).done(function( response, textStatus, jqXHR ) {
			console.log("response : " + response);

			mainPage.drawProducts(response);
		}).fail(function( jqXHR, textStatus, errorThrown ) {
			console.log("textStatus : " + textStatus);
		});
	},

	getCategories : function() {
		$.ajax({
			url: "/api/categories",
			type: "GET",
			dataType: "json"
		}).done(function( response, textStatus, jqXHR ) {
			console.log("response : " + response);
			mainPage.drawCategories(response);
		}).fail(function( jqXHR, textStatus, errorThrown ) {
			console.log("textStatus : " + textStatus);
		});
	},

	// drawMoreViewBtn : function() {
	// 	var div = document.createElement("div");
	// 	var button = document.createElement("button");
	// 	var span = document.createElement("span");
	//
	// 	div.className = "more";
	// 	button.className = "btn";
	// 	button.dataset.view = 1;
	// 	button.addEventListener("click", function() {
	// 		mainPage.moreView(button);
	// 	});
	// 	span.textContent = "더보기";
	//
	// 	button.append(span);
	// 	div.append(button);
	//
	// 	$('#wrap_event_list').append(div);
	// },

	drawProducts : function(response) {
		if (response.data.productList.length === 1)
			$('#wrap_event_list').prepend($('<ul>', {class: 'lst_event_box'}));
		else if (response.data.productList.length >= 2) {
			$('#wrap_event_list').prepend($('<ul>', {class: 'lst_event_box'}));
			$('#wrap_event_list').prepend($('<ul>', {class: 'lst_event_box'}));
		}

		$.each(response.data.productList, function(index, item) {
			var parentNodeIdx = index%2;
			$('#itemList').tmpl(item).appendTo($('.lst_event_box:eq(' + parentNodeIdx + ')'));
		});
	},

	drawCategories : function(response) {
		$.each(response.data, function(index, item) {
			var li = document.createElement("li");
			var a = document.createElement("a");
			var span = document.createElement("span");

			li.className = "item";
			li.dataset.category = item.id;
			li.addEventListener("click", function() {
				mainPage.selectCate(this, item.count);
			});

			a.className = "anchor category";
			span.textContent = item.name;

			mainPage.totalProductCount += item.count;

			a.append(span);
			li.append(a);

			$("#category_tab").append(li);
		});

		mainPage.setProductCount(mainPage.totalProductCount);
	},

	selectTotalList : function(selectedCate) {
		mainPage.selectCate(selectedCate, mainPage.totalProductCount);
	},

	setProductCount : function(count) {
		$("#product_count").html(count + "개");
	},

	selectCate : function(selectedCate, count) {
		$('.anchor.category').removeClass('active');
		$(selectedCate).children().addClass('active');
		$('#wrap_event_list').empty();

		mainPage.setProductCount(count);
		//mainPage.drawMoreViewBtn();
		mainPage.getProducts(selectedCate.dataset.category);
	},

	moreView : function(button) {
		debugger;
	}
};

$(document).ready(function() {
	mainPage.init();
});
