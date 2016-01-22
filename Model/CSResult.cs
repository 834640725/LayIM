﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LayIM.Model
{
    [Serializable]
    public class CSResult
    {
        public int status { get; set; }
        public string msg { get; set; }
        public object data { get; set; }
    }
}