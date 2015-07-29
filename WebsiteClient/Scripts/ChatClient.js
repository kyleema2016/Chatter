$(function () {

	var view = new ChatClientView();

	// Connect to the SignalR chat hub.
	$.connection.hub.start().done(function () {
		// Code that can run after connection has opened
		showInfo('Connected to chat hub');
	});

	// Declare a proxy to reference the chat hub.
	var chatHub = $.connection.chatHub;

	// Create an 'event listener' function that the server hub can call to broadcast messages to clients.
	chatHub.client.broadcastMessage = function (name, message) {
		// Html encode display name and message.
		var encodedName = $('<div />').text(name).html();
		var encodedMsg = $('<div />').text(message).html();

		// Add the message to the page.
		view.discussionList.append('<li class="list-group-item list-group-item-success"><strong>' + encodedName + ':</strong>' + encodedMsg + '</li>');
	};

	// Event listener for broadcastActiveUsers
	chatHub.client.broadcastActiveUsers = function (users) {
		showInfo(users);
	};

	// Event listener for broadcastUserJoined
	chatHub.client.broadcastUserJoined = function (userName) {
		showInfo(userName + " has joined the chat session");
	};

	function showInfo(info) {
		view.infoLabel.hide(0).text(info).show(250);
	};

	view.joinButton.click(function () {
		var userName = view.userNameInput.val().trim();

		if (userName.length > 0) {
			chatHub.server.joinUser(userName);

			view.userNameInput.val(userName);
			view.userNameInput.hide();
			view.joinButton.hide();
			view.messageInput.show().focus();
			view.sendMessageButton.show();
			view.requestActiveUsersButton.show();
		}
	});

	view.sendMessageButton.click(function () {
		if (view.messageInput.val().trim().length == 0)
			return;

		// Call the SendMessage method on the hub.
		chatHub.server.sendMessage(
			 view.userNameInput.val(),
			 view.messageInput.val());

		// Clear text box and reset focus for next comment.
		view.messageInput.val('').focus();
	});

	view.requestActiveUsersButton.click(function () {
		// call the ActiveUsers method on the hub
		chatHub.server.activeUsers();
	});

});
