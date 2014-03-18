/**
concurrence
@class concurrence
@author R&D
@version 1.0
*/
var concurrence = $.inherit(
{
    __constructor : function() {

    },
    
    init : function(route, id, dateUpdate, uri) {
        this.type = 1;
        this.status = false;
        this.route = route;
        this.id = id;
        this.dateUpdate = dateUpdate;
        this.uri = uri;
        this.oldUsers = new Array();
        this.oldUpdates = new Array();
    },

    load : function() {
        $o = this;
        $.ajax({
            type: "POST",
            url: this.route,
            data:{type:this.type, id: this.id, dateUpdate:this.dateUpdate, uri:this.uri},
            dataType: 'json',
            success: function(data) {
               if (data == null ) {
                   return;
               }
               var message = '';
               var displayUpdate = false;
               if (parseInt($o.type) == 1) {
                   if (data.newUsers.length > 0) {
                      for (var i in data.newUsers) {
                          message = '<b>«'+data.newUsers[i].username+'»</b> est déja en mode édition!<br />';
                          notification.notifiy(message);
                      }
                   }
                   $o.setType(2);
               } else {
                   if (data.updateData.date_update != '') {
                       var existUser = false;
                       for (j in $o.oldUpdates) {
                         if ($o.oldUpdates[j] == data.updateData.date_update) {
                            existUser = true;
                         }
                       }
                       if (!existUser) {
                           displayUpdate = true;
                           $o.setStatus(true);
                           $o.oldUpdates.push(data.updateData.date_update);
                           message = '<b>«'+data.updateData.last_user_updated+'»</b> a modifié cette Utilisateur';
                       }
                   }
                   if (data.newUsers.length > 0) {
                      for (i in data.newUsers) {                         
                          if (!$o.in_array(data.newUsers[i], $o.oldUsers)) {
                              message += '<b>«'+data.newUsers[i].username+'»</b> en mode édition!<br />';
                              $o.oldUsers.push(data.newUsers[i]);
                          } else {
                              var sameUser = $o.in_array(data.newUsers[i], $o.oldUsers);
                              var exist = false;
                              for (j in sameUser) {
                                 if (sameUser[j] == data.newUsers[i].date_action) {
                                    exist = true;
                                 }
                              }

                              if (!exist) {
                                  message = '<b>«'+data.newUsers[i].username+'»</b> en mode édition!<br />';
                                  notification.notifiy(message);
                                  $o.oldUsers.push(data.newUsers[i]);
                              }
                          }
                      }
                   }
               }
               if (displayUpdate) {
                  notification.notifiy(message);
                  displayUpdate = false;
               }
            },
            error: function(xhr) {
            }
        });
    },

    getStatus : function () {
        return this.status;
    },

    setStatus : function (status) {
        this.status = status;
    },

    setType : function (type) {
        this.type = type;
    },


    start : function () {
        $o = this;
        $(this).everyTime(3000,function() {
            $o.load();
        });
    },

    /**
         * Test value in array
         */
    in_array : function(value, arr) {
        var key = '';
        var result = [];
        var exist = false;
        for (key in arr) {
            if (arr[key].username == value.username) {
                exist = true;
                result.push(arr[key].date_action);
            }
        }
        if (exist) {
            return result;
        }
        
        return false;
    }
});
