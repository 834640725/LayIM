using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LayIM.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                  name: "getdata",
                  url: "getdata",
                 defaults: new { controller = "CustomService", action = "GetData" }
                  );
            /*默认路由*/
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Index", action = "Index" }
            );

        }
    }
}