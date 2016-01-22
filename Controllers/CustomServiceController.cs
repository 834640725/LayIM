using LayIM.BLL;
using LayIM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LayIM.Controllers
{
    public class CustomServiceController : Controller
    {
        // GET: CustomService
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取数据
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public JsonResult GetData(string type)
        {
            var result = DBHelper.GetResult(type);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}