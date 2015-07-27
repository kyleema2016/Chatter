$(function() {
    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;
    var view = new ChatClientView();

    // Create an 'event listener' function that the server hub can call to broadcast messages to clients.
    chat.client.broadcastMessage = function(name, message) {
        // Html encode display name and message.
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();

        // Add the message to the page.
        view.discussionList.append('<li class="list-group-item list-group-item-success"><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };

    // Event listener for broadcastActiveUsers
    chat.client.broadcastActiveUsers = function(users) {
        view.infoLabel.hide(0).text(users).show(250);
    };

    // Event listener for broadcastUserJoined
    chat.client.broadcastUserJoined = function(userName) {
        view.infoLabel.hide(0).text(userName + " has joined the chat session").show(250);
    };

    // Start the connection.
    $.connection.hub.start().done(function () {
        // Code that can run after connection has opened
    });

    view.joinButton.click(function() {
        var userName = view.userNameInput.val().trim();

        if (userName.length > 0) {
            chat.server.joinUser(userName);

            view.userNameInput.val(userName);
            view.userNameInput.hide();
            view.joinButton.hide();
            view.infoLabel.show();
            view.messageInput.show().focus();
            view.sendMessageButton.show();
            view.requestActiveUsersButton.show();
        }
    });

    view.sendMessageButton.click(function () {
        if (view.messageInput.val().trim().length == 0)
            return;

        // Call the SendMessage method on the hub.
        chat.server.sendMessage(
            view.userNameInput.val(),
            view.messageInput.val());

        // Clear text box and reset focus for next comment.
        view.messageInput.val('').focus();
    });

    view.requestActiveUsersButton.click(function () {
        // call the ActiveUsers method on the hub
        chat.server.activeUsers();
    });

});
