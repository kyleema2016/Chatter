using System;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Chatter.Server.Startup))]

namespace Chatter.Server
{
	public partial class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			app.MapSignalR();
		}
	}
}

