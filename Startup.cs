using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LayIM.Startup))]
namespace LayIM
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/cs", map =>
            {
                var hubConfiguration = new HubConfiguration()
                {
                    EnableJSONP = true
                };
                map.RunSignalR(hubConfiguration);
            });
        }
    }
}
