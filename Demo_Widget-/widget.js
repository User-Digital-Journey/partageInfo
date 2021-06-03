var infosQueue = queueConfigurator();
window._genesys = {
	widgets: {

		console: { open: true },

		main: {
			theme: 'helpline',
			themes: {

				dark: 'cx-theme-dark',
				light: 'cx-theme-light',
				helpline: 'cx-theme-helpline'
			},
			preload: ['webchat'],
			lang: 'fr',
			i18n: "https://apps.mypurecloud.de/widgets/9.0.017.05/i18n/widgets-fr.i18n.json",
			debug: true
		},

		webchat: {

			chatButton: {
				enabled: true, // (boolean) Enable/disable chat button on screen.
				template: '<div>Live Chat</div>', // (string) Custom HTML string template for chat button.
				effect: 'slide',         // (string) Type of animation effect when revealing chat button. 'slide' or 'fade'.
				openDelay: 0,        // (number) Number of milliseconds before displaying chat button on screen.
				effectDuration: 400,    // (number) Length of animation effect in milliseconds.
				hideDuringInvite: true  // (boolean) When auto-invite feature is activated, hide the chat button. When invite is dismissed, reveal the chat button again.
			},

			userData: {},
			formJSON: {},
		    form: {
				autoSubmit: false,
				wrapper:"<table></table>",
				inputs:[
					{
						id:"cx_webchat_form_firstname",
						name:"firstname",
						type:"text",
						maxlength:"100",
						placeholder:"@i18n:webchat.ChatFormPlaceholderFirstName",
						label:"@i18n:webchat.ChatFormFirstName",
					},
					{
						id:"cx_webchat_form_lastname",
						name:"lastname",
						type:"text",
						maxlength:"100",
						placeholder:"@i18n:webchat.ChatFormPlaceholderLastName",
						label:"@i18n:webchat.ChatFormLastName",
					},
					{
						id:"cx_webchat_form_email",
						name:"email_customer",
						type:"text",
						maxlength:"100",
						placeholder:"@i18n:webchat.ChatFormPlaceholderEmail",
						label:"Email",
					},
					{
						id: "cx_webchat_form_incidence_id",
						name: "incident_ID",
						type: "text",
						maxlength: "100",
						placeholder: "Incident ID",
						label: "Incident ID",
					}]
				},

			transport: {
				type: 'purecloud-v2-sockets',
				dataURL: 'https://api.mypurecloud.de',
				deploymentKey: infosQueue["deploymentKey"],
				orgGuid: infosQueue["orgGuid"],
				interactionData: {
					routing: {
						targetType: 'QUEUE',
						targetAddress: infosQueue["targetAddress"],
						priority: 2
					}
				}
			}
		}
	}
};

const customPlugin = CXBus.registerPlugin('Custom');

customPlugin.subscribe('WebChatService.started', function (e) {
	console.log('Chat started', e);
});

customPlugin.subscribe('WebChatService.ended', function (e) {
	console.log('Chat ended', e);
});