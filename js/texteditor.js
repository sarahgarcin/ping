$.fn.myTextEditor = function(options){
        // extend the option with the default ones
        var settings = $.extend({
            width : "500px",
            height : "550px",
          fonts : ["Arial","Comic Sans MS","Courier New","Monotype Corsiva","Tahoma","Times"]
        },options);
        return this.each(function(){
            var $this = $(this).hide();
       // create a container div on the fly
       var containerDiv = $("<div/>",{
           css : {
               width : settings.width ,
               height : settings.height,
               border : "1px solid #ccc"
           }
       });
       $this.after(containerDiv); 
       var editor = $("<iframe/>",{
           frameborder : "0" 
       }).appendTo(containerDiv).get(0);
       // opening and closing the editor is a workaround to solve issue in Firefox
       editor.contentWindow.document.open();
       editor.contentWindow.document.close();
       editor.contentWindow.document.designMode="on";
       var buttonPane = $("<div/>",{
          "class" : "editor-btns",
          css : {
              width : settings.width,
              height : "25px"
          }
       }).prependTo(containerDiv);
       var btnBold = $("<a/>",{
        href : "#",
        text : "B",        
        data : {
            commandName : "bold"
        },
        click : execCommand 
        }).appendTo(buttonPane );
          var btnItalic = $("<a/>",{
        href : "#",
        text : "I",
        data : {
            commandName : "italic"
        },
        click : execCommand 
        }).appendTo(buttonPane );
          var btnUnderline = $("<a/>",{
        href : "#",
        text : "U",
        data : {
            commandName : "underline"
        },

        click : execCommand 
        }).appendTo(buttonPane );
          var selectFont = $("<select/>",{
            data : {
              commandName : "FontName"
            },
            change : execCommand
          }).appendTo(buttonPane );  
          $.each(settings.fonts,function(i,v){
            $("<option/>",{
              value : v,
              text : v
            }).appendTo(selectFont);
            
          }); 

           var sBtnAddImage = $("<a/>",{
          href : "#",
          text : "Image",        
          data : {
              commandName : "bold"
          },
          click : promptForImage 
        }).appendTo(buttonPane );
  
          function promptForImage() {
            var aImg=prompt('insert image url', 'http://www.colorspire.com/s/i/colorspire.png');
            
            //alert(editor.contentWindow.getSelection()); // the selected text if any 
            var aOk=editor.contentWindow.document.execCommand(
              'insertimage', false, aImg
            );
            if (aOk===true) {
              var aLastImg=$(editor.contentWindow.document).find('img');
              if (aLastImg.length>0) {

                aLastImg.each(function(pIndex) {
                  if ($(this).attr('id')===null || $(this).attr('id')==='' || $(this).attr('id')===undefined) {
                    $(this).attr('id', 'img'+new Date());
                    $(this).bind('click', function() {
                      window.open('http://www.google.com?q=laboratory', 'newWindow');
                      alert(editor.contentWindow.document.body.innerHTML);
                    });
                  }
                });

              } // end -- if (aLastImg.length>0)
            } // end -- if (aOk===true)
          }

    function execCommand (e) {
            $(this).toggleClass("selected");
            var contentWindow = editor.contentWindow;
            contentWindow.focus();
            contentWindow.document.execCommand($(this).data("commandName"), false, this.value || "");
            contentWindow.focus();
            return false;
    }
    });
};