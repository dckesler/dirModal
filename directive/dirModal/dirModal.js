(function(){
    angular
        .module("dirModal", [])
        .directive("dirModal", dirModal);
    function dirModal($timeout){
        return {
            restrict: "A",
            scope: {
                modalTitle: "=",
                modalContent: "=",
                modalFull: "@"
            },
            templateUrl: "directive/dirModal/dirModal.html",
            controller: function(){
                var modal = this;
                modal.active = false;
                modal.transition = false;
            },
            controllerAs: "modal",
            bindToController: true,
            transclude: true,
            link: function(scope, elem, attrs){
                $timeout(reset);
                function reset(){
                    var modal;
                    var backgroundFade;

                    //This helps the animation go to and from the button's original position
                    var originalStyle = {
                        top: elem[0].offsetTop,
                        left: elem[0].offsetLeft,
                        width: elem[0].clientWidth,
                        height: elem[0].clientHeight
                    };

                    //This is the Div that closes the modal
                    var closer = angular.element('<div style="width: 15px; height: 15px; border: 2px solid #CCCCCC; cursor: pointer; position: absolute; top: 5px; left: 5px"></div>');

                    elem.on("click", function(){
                        if(!modal){
                            modal = true;

                            //Sets the elem up for animation
                            elem.css({
                                "left": originalStyle.left,
                                "top": originalStyle.top,
                                "position": "fixed",
                                "z-index": "20000",
                                "text-align": "center",
                                "overflow-y": "scroll"
                            });

                            //Hides stuff during animations
                            scope.modal.transition = true;
                            scope.$apply();

                            //Checks to see if it's a full-size modal or a sized one
                            if(attrs.modalSize !== "full"){

                                //This is the div that makes the background fade and sticks it over the body
                                backgroundFade = angular.element('<div style="width:'+ window.innerWidth +'px; height:' + window.innerHeight + 'px; background: burlywood; opacity: .4; position: absolute; z-index: 10000;"></div>');
                                $('body').prepend(backgroundFade);

                                //Modal expanding animation
                                elem.animate({
                                    width: attrs.modalSize + 'px',
                                    height: attrs.modalSize + 'px',
                                    left: ((window.innerWidth / 2) - (Number(attrs.modalSize) / 2)) + 'px',
                                    top: ((window.innerHeight / 2) - (Number(attrs.modalSize) / 2)) + 'px'
                                }, {complete: function(){
                                    //Padding for modal
                                    elem.css("padding", "15px 30px");
                                    scope.modal.active = true;
                                    scope.modal.transition = false;
                                    scope.$apply();

                                    //Adds close button
                                    elem.append(closer);
                                }});

                            } else {
                                //Enlarges close button for full-size window
                                closer.css({
                                    "width": '20px',
                                    "height": '25px',
                                    "border": '3px solid #CCC'
                                });

                                //Modal expanding animation
                                elem.animate({
                                    width: window.innerWidth+'px',
                                    height: window.innerHeight+'px',
                                    left: 0,
                                    top: 0
                                }, {complete: function(){
                                    //Padding for full-size
                                    elem.css("padding", "50px 150px");
                                    scope.modal.active = true;
                                    scope.modal.transition = false;
                                    scope.$apply();

                                    //Adds close button
                                    elem.append(closer);
                                   }});

                                //Keeps the full-size window the size of the whole window
                                window.onresize = function(){
                                    elem.css("width", window.innerWidth+'px');
                                    elem.css("height", window.innerHeight+'px');
                                }
                            }
                        }
                    });

                    //Animation for close button hover
                    closer.on("mouseover", function(){
                        closer.css('border', "2px solid #EEEEDD")
                    });
                    closer.on("mouseout", function(){
                        closer.css('border', "2px solid #CCCCCC")
                    });

                    //Close modal window logic
                    closer.on("click", function(){
                        if(modal){


                            //Remove all of the added in parts to go back to button mode
                            angular.element(closer).remove();
                            if(backgroundFade){
                                angular.element(backgroundFade).remove();
                            }

                            //Back to button animation
                            scope.modal.transition = true;
                            scope.$apply();
                            elem.animate(originalStyle, {
                                complete: function(){
                                    scope.modal.active = false;
                                    scope.modal.transition = false;
                                    scope.$apply();

                                    //Sets it back to normal. Make sure you don't give any inline styles on the element
                                    //with the directive
                                    elem.removeAttr("style");

                                    //This has to happen.
                                    reset();
                                }
                            });
                        }
                    })
                }

            }
        };
    }
})();