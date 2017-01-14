


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



	var miniBoxItem = (function(){

		function miniBoxItem(opts){

			var config = $.extend({}, {
					color: getRandomColor(),
					mini_icon: "",
					link: "",
					text: "",
					text_color: "#000000"
				}, opts);

			this.element = $("<a>");

			this.mini_icon = config["mini_icon"];
			this.link = config["link"];
			this.color = config["color"];

			this.title = config["title"];
			this.text = config["text"];
			this.text_color = config["text_color"];
		}

		miniBoxItem.prototype.create = function(){
			var self = this;
			this.element = $("<a>");
			self.element.css({
								"background-color": self.color,
								"background-image": "url('"+self.mini_icon+"')",
								"background-size":"100%",
								"color":self.text_color
			});
			self.element.attr("href", self.link);
			self.element.html(self.text);
			self.element.addClass("miniBoxItem");
			return self.element
		}

		miniBoxItem.prototype.remove = function(){
			var self = this;
			self.element.remove();
		}

		return miniBoxItem;
	})();

$(document).ready(function(){


	jQuery.fn.extend({
		miniBox: function(todo) {
			var element = this;
			if (typeof todo == "string"){
				if(todo.toLowerCase() == "draw"){
					drawItems(element, todo)
				}
				if(todo.toLowerCase() == "redraw"){
					removeItems(element, todo, function(){
						drawItems(element, todo);
					});

				}
			}else{
				$.each(todo, function(key, value){
					if(key == "add"){
						if(element.children(".miniBoxMaster").length > 0){
							var inner_element = element.children(".miniBoxMaster");
						}else{
							var inner_element = $("<div>");
							inner_element.addClass("miniBoxMaster");
							inner_element.appendTo(element);
							inner_element.data("miniBox", []);
						}

						var miniBoxManager = inner_element.data("miniBox");
						miniBoxManager.push(value);
					}

				});
			}

			function removeItems(element, todo, callback){
				if(element.children(".miniBoxMaster").length > 0){
					var inner_element = element.children(".miniBoxMaster");
					var miniBoxManager = inner_element.data("miniBox");
					$.each(miniBoxManager, function(key, value){
						value.remove();
					});
					element.children(".miniBoxMaster").find(".miniBoxRow").remove();

					callback();
				}
			}

			function drawItems(element, todo){
				if(element.children(".miniBoxMaster").length > 0){
					var inner_element = element.children(".miniBoxMaster");
					var miniBoxManager = inner_element.data("miniBox");

					var items_count = miniBoxManager.length;
					var summe  = 0;
					var runs  = 0;

					do {
						runs = runs+1;
						summe = summe + runs;
					} while (summe < items_count);


			        var count = 0;
			        var item_place = 0;
			        var line_nr = runs;

			        for(i = runs; i >= 0; i--){

			            var row_content = $("<div>");
			            line_nr = line_nr-1;
			            for(y = line_nr; y >= 0; y--){
			                if(summe != items_count){
			                    if(count >= line_nr){
			                        if(y == 0){
			                             items_count = items_count - (runs-1);
			                        }else{
										miniBoxManager[item_place].create().appendTo(row_content);
			                        	item_place++;
			                            items_count = items_count - runs;
			                        }
			                    }else{
									miniBoxManager[item_place].create().appendTo(row_content);
		                        	item_place++;
			                        items_count = items_count - runs;
			                    }
			                }else{
								miniBoxManager[item_place].create().appendTo(row_content);
	                        	item_place++;
			                    items_count = items_count - runs;
			                }
			                summe = summe - runs;
			                count++;
			            }
						row_content.addClass("miniBoxRow");
						row_content.prependTo(inner_element);
			        }
				}else{
					console.log("Cant draw. Add items First")
				}
			}

			return this;
		}
	});
});