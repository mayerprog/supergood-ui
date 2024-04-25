import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  // polyLayers: {
  //   21370: {
  //     ora_id: 21370,
  //     longitude: 37.3343538,
  //     latitude: 55.7991517,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21371: {
  //     ora_id: 21371,
  //     longitude: 37.342101,
  //     latitude: 55.797831,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21372: {
  //     ora_id: 21372,
  //     longitude: 37.346007,
  //     latitude: 55.796626,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21373: {
  //     ora_id: 21373,
  //     longitude: 37.348517,
  //     latitude: 55.795262,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21374: {
  //     ora_id: 21374,
  //     longitude: 37.349741,
  //     latitude: 55.793559,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21375: {
  //     ora_id: 21375,
  //     longitude: 37.350663,
  //     latitude: 55.790695,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21376: {
  //     ora_id: 21376,
  //     longitude: 37.3504986,
  //     latitude: 55.7878562,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21377: {
  //     ora_id: 21377,
  //     longitude: 37.34861,
  //     latitude: 55.785078,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21378: {
  //     ora_id: 21378,
  //     longitude: 37.332415,
  //     latitude: 55.774748,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21379: {
  //     ora_id: 21379,
  //     longitude: 37.330631,
  //     latitude: 55.772169,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21380: {
  //     ora_id: 21380,
  //     longitude: 37.338388,
  //     latitude: 55.771158,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21381: {
  //     ora_id: 21381,
  //     longitude: 37.336476,
  //     latitude: 55.769104,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21382: {
  //     ora_id: 21382,
  //     longitude: 37.344363,
  //     latitude: 55.768609,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21383: {
  //     ora_id: 21383,
  //     longitude: 37.344736,
  //     latitude: 55.76945,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21384: {
  //     ora_id: 21384,
  //     longitude: 37.352108,
  //     latitude: 55.769573,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21385: {
  //     ora_id: 21385,
  //     longitude: 37.358245,
  //     latitude: 55.772061,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21386: {
  //     ora_id: 21386,
  //     longitude: 37.357717,
  //     latitude: 55.769701,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21387: {
  //     ora_id: 21387,
  //     longitude: 37.359872,
  //     latitude: 55.766609,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21388: {
  //     ora_id: 21388,
  //     longitude: 37.363952,
  //     latitude: 55.764144,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21389: {
  //     ora_id: 21389,
  //     longitude: 37.369051,
  //     latitude: 55.764919,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21390: {
  //     ora_id: 21390,
  //     longitude: 37.369758,
  //     latitude: 55.771404,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21391: {
  //     ora_id: 21391,
  //     longitude: 37.383642,
  //     latitude: 55.772517,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21392: {
  //     ora_id: 21392,
  //     longitude: 37.387112,
  //     latitude: 55.771042,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21393: {
  //     ora_id: 21393,
  //     longitude: 37.400259,
  //     latitude: 55.771296,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21394: {
  //     ora_id: 21394,
  //     longitude: 37.407261,
  //     latitude: 55.775087,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21395: {
  //     ora_id: 21395,
  //     longitude: 37.404898,
  //     latitude: 55.776112,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21396: {
  //     ora_id: 21396,
  //     longitude: 37.402947,
  //     latitude: 55.777254,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21397: {
  //     ora_id: 21397,
  //     longitude: 37.401709,
  //     latitude: 55.780575,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21398: {
  //     ora_id: 21398,
  //     longitude: 37.404048,
  //     latitude: 55.783897,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21399: {
  //     ora_id: 21399,
  //     longitude: 37.407395,
  //     latitude: 55.787609,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21400: {
  //     ora_id: 21400,
  //     longitude: 37.410228,
  //     latitude: 55.792614,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21401: {
  //     ora_id: 21401,
  //     longitude: 37.425334,
  //     latitude: 55.792373,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21402: {
  //     ora_id: 21402,
  //     longitude: 37.420871,
  //     latitude: 55.796289,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21403: {
  //     ora_id: 21403,
  //     longitude: 37.413961,
  //     latitude: 55.797764,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21404: {
  //     ora_id: 21404,
  //     longitude: 37.418897,
  //     latitude: 55.801535,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21405: {
  //     ora_id: 21405,
  //     longitude: 37.428274,
  //     latitude: 55.80307,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21406: {
  //     ora_id: 21406,
  //     longitude: 37.429921,
  //     latitude: 55.801995,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21407: {
  //     ora_id: 21407,
  //     longitude: 37.432333,
  //     latitude: 55.802715,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21408: {
  //     ora_id: 21408,
  //     longitude: 37.431865,
  //     latitude: 55.803123,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21409: {
  //     ora_id: 21409,
  //     longitude: 37.437339,
  //     latitude: 55.804318,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21410: {
  //     ora_id: 21410,
  //     longitude: 37.439561,
  //     latitude: 55.802063,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21411: {
  //     ora_id: 21411,
  //     longitude: 37.440843,
  //     latitude: 55.802024,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21412: {
  //     ora_id: 21412,
  //     longitude: 37.444145,
  //     latitude: 55.803092,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21413: {
  //     ora_id: 21413,
  //     longitude: 37.445859,
  //     latitude: 55.805126,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21414: {
  //     ora_id: 21414,
  //     longitude: 37.446029,
  //     latitude: 55.809664,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21415: {
  //     ora_id: 21415,
  //     longitude: 37.447498,
  //     latitude: 55.812297,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21416: {
  //     ora_id: 21416,
  //     longitude: 37.452354,
  //     latitude: 55.819323,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21417: {
  //     ora_id: 21417,
  //     longitude: 37.448222,
  //     latitude: 55.820687,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21418: {
  //     ora_id: 21418,
  //     longitude: 37.4485381,
  //     latitude: 55.8216846,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21419: {
  //     ora_id: 21419,
  //     longitude: 37.4485323,
  //     latitude: 55.8223467,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21420: {
  //     ora_id: 21420,
  //     longitude: 37.4483118,
  //     latitude: 55.8230089,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21421: {
  //     ora_id: 21421,
  //     longitude: 37.4478066,
  //     latitude: 55.8237907,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21422: {
  //     ora_id: 21422,
  //     longitude: 37.4467857,
  //     latitude: 55.8246685,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21423: {
  //     ora_id: 21423,
  //     longitude: 37.4449641,
  //     latitude: 55.8256331,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21424: {
  //     ora_id: 21424,
  //     longitude: 37.4437756,
  //     latitude: 55.8261908,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21425: {
  //     ora_id: 21425,
  //     longitude: 37.4421815,
  //     latitude: 55.826791,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21426: {
  //     ora_id: 21426,
  //     longitude: 37.438885,
  //     latitude: 55.8335372,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21427: {
  //     ora_id: 21427,
  //     longitude: 37.4392531,
  //     latitude: 55.8352634,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21428: {
  //     ora_id: 21428,
  //     longitude: 37.4410847,
  //     latitude: 55.8357338,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21429: {
  //     ora_id: 21429,
  //     longitude: 37.4414787,
  //     latitude: 55.8359873,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21430: {
  //     ora_id: 21430,
  //     longitude: 37.4361607,
  //     latitude: 55.8363835,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21431: {
  //     ora_id: 21431,
  //     longitude: 37.4338253,
  //     latitude: 55.8362855,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21432: {
  //     ora_id: 21432,
  //     longitude: 37.4302633,
  //     latitude: 55.8352347,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21433: {
  //     ora_id: 21433,
  //     longitude: 37.4285896,
  //     latitude: 55.8345212,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21434: {
  //     ora_id: 21434,
  //     longitude: 37.4278029,
  //     latitude: 55.8318341,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21435: {
  //     ora_id: 21435,
  //     longitude: 37.42505,
  //     latitude: 55.8288286,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21436: {
  //     ora_id: 21436,
  //     longitude: 37.4209956,
  //     latitude: 55.8275661,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21437: {
  //     ora_id: 21437,
  //     longitude: 37.4133693,
  //     latitude: 55.8288705,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21438: {
  //     ora_id: 21438,
  //     longitude: 37.398199,
  //     latitude: 55.831656,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21439: {
  //     ora_id: 21439,
  //     longitude: 37.395799,
  //     latitude: 55.83113,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21440: {
  //     ora_id: 21440,
  //     longitude: 37.394761,
  //     latitude: 55.828819,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21441: {
  //     ora_id: 21441,
  //     longitude: 37.380976,
  //     latitude: 55.82984,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21442: {
  //     ora_id: 21442,
  //     longitude: 37.378556,
  //     latitude: 55.826907,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21443: {
  //     ora_id: 21443,
  //     longitude: 37.380745,
  //     latitude: 55.82156,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21444: {
  //     ora_id: 21444,
  //     longitude: 37.372762,
  //     latitude: 55.810468,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21445: {
  //     ora_id: 21445,
  //     longitude: 37.367784,
  //     latitude: 55.808877,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21446: {
  //     ora_id: 21446,
  //     longitude: 37.3586221,
  //     latitude: 55.8095155,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21447: {
  //     ora_id: 21447,
  //     longitude: 37.3478837,
  //     latitude: 55.8066622,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21448: {
  //     ora_id: 21448,
  //     longitude: 37.337175,
  //     latitude: 55.8024375,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21449: {
  //     ora_id: 21449,
  //     longitude: 37.334043,
  //     latitude: 55.8000745,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   21450: {
  //     ora_id: 21450,
  //     longitude: 37.3343538,
  //     latitude: 55.7991517,
  //     dept_area_id: 1175,
  //     dept_id: 1374,
  //   },
  //   22095: {
  //     ora_id: 22095,
  //     longitude: 37.5532395,
  //     latitude: 55.8125544,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22096: {
  //     ora_id: 22096,
  //     longitude: 37.5574598,
  //     latitude: 55.8062495,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22097: {
  //     ora_id: 22097,
  //     longitude: 37.5530231,
  //     latitude: 55.8056817,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22098: {
  //     ora_id: 22098,
  //     longitude: 37.5401086,
  //     latitude: 55.8117708,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22099: {
  //     ora_id: 22099,
  //     longitude: 37.535142,
  //     latitude: 55.8041906,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22100: {
  //     ora_id: 22100,
  //     longitude: 37.5353699,
  //     latitude: 55.7911349,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22101: {
  //     ora_id: 22101,
  //     longitude: 37.5265469,
  //     latitude: 55.7921277,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22102: {
  //     ora_id: 22102,
  //     longitude: 37.5194417,
  //     latitude: 55.7911406,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22103: {
  //     ora_id: 22103,
  //     longitude: 37.5182498,
  //     latitude: 55.7902538,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22104: {
  //     ora_id: 22104,
  //     longitude: 37.5181043,
  //     latitude: 55.7883148,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22105: {
  //     ora_id: 22105,
  //     longitude: 37.5203274,
  //     latitude: 55.784896,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22106: {
  //     ora_id: 22106,
  //     longitude: 37.5266496,
  //     latitude: 55.7828997,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22107: {
  //     ora_id: 22107,
  //     longitude: 37.5309115,
  //     latitude: 55.781965,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22108: {
  //     ora_id: 22108,
  //     longitude: 37.5327929,
  //     latitude: 55.782241,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22109: {
  //     ora_id: 22109,
  //     longitude: 37.5338653,
  //     latitude: 55.7826994,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22110: {
  //     ora_id: 22110,
  //     longitude: 37.536161,
  //     latitude: 55.7815771,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22111: {
  //     ora_id: 22111,
  //     longitude: 37.5380381,
  //     latitude: 55.7819813,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22112: {
  //     ora_id: 22112,
  //     longitude: 37.5403929,
  //     latitude: 55.7817489,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22113: {
  //     ora_id: 22113,
  //     longitude: 37.5423855,
  //     latitude: 55.7807639,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22114: {
  //     ora_id: 22114,
  //     longitude: 37.5433387,
  //     latitude: 55.7796439,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22115: {
  //     ora_id: 22115,
  //     longitude: 37.5456821,
  //     latitude: 55.7805321,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22116: {
  //     ora_id: 22116,
  //     longitude: 37.5507805,
  //     latitude: 55.7774765,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22117: {
  //     ora_id: 22117,
  //     longitude: 37.5551319,
  //     latitude: 55.7761901,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22118: {
  //     ora_id: 22118,
  //     longitude: 37.5545913,
  //     latitude: 55.7737451,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22119: {
  //     ora_id: 22119,
  //     longitude: 37.5727203,
  //     latitude: 55.7754409,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22120: {
  //     ora_id: 22120,
  //     longitude: 37.5762547,
  //     latitude: 55.7754244,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22121: {
  //     ora_id: 22121,
  //     longitude: 37.582496,
  //     latitude: 55.7710885,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22122: {
  //     ora_id: 22122,
  //     longitude: 37.5835803,
  //     latitude: 55.7704328,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22123: {
  //     ora_id: 22123,
  //     longitude: 37.5854048,
  //     latitude: 55.7694995,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22124: {
  //     ora_id: 22124,
  //     longitude: 37.58946,
  //     latitude: 55.7663507,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22125: {
  //     ora_id: 22125,
  //     longitude: 37.590849,
  //     latitude: 55.7658425,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22126: {
  //     ora_id: 22126,
  //     longitude: 37.5908867,
  //     latitude: 55.7642994,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22127: {
  //     ora_id: 22127,
  //     longitude: 37.5886257,
  //     latitude: 55.7641225,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22128: {
  //     ora_id: 22128,
  //     longitude: 37.5879526,
  //     latitude: 55.7633781,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22129: {
  //     ora_id: 22129,
  //     longitude: 37.5923795,
  //     latitude: 55.7613336,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22130: {
  //     ora_id: 22130,
  //     longitude: 37.5932847,
  //     latitude: 55.7606834,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22131: {
  //     ora_id: 22131,
  //     longitude: 37.5944474,
  //     latitude: 55.7592605,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22132: {
  //     ora_id: 22132,
  //     longitude: 37.5957713,
  //     latitude: 55.7586132,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22133: {
  //     ora_id: 22133,
  //     longitude: 37.5956716,
  //     latitude: 55.7580238,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22134: {
  //     ora_id: 22134,
  //     longitude: 37.5986258,
  //     latitude: 55.7577169,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22135: {
  //     ora_id: 22135,
  //     longitude: 37.6067315,
  //     latitude: 55.7563971,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22136: {
  //     ora_id: 22136,
  //     longitude: 37.612297,
  //     latitude: 55.7545857,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22137: {
  //     ora_id: 22137,
  //     longitude: 37.6146818,
  //     latitude: 55.7568584,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22138: {
  //     ora_id: 22138,
  //     longitude: 37.6177894,
  //     latitude: 55.7583317,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22139: {
  //     ora_id: 22139,
  //     longitude: 37.6214051,
  //     latitude: 55.7591004,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22140: {
  //     ora_id: 22140,
  //     longitude: 37.6200158,
  //     latitude: 55.7621528,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22141: {
  //     ora_id: 22141,
  //     longitude: 37.6198364,
  //     latitude: 55.7648378,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22142: {
  //     ora_id: 22142,
  //     longitude: 37.622086,
  //     latitude: 55.7671699,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22143: {
  //     ora_id: 22143,
  //     longitude: 37.6278994,
  //     latitude: 55.7666156,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22144: {
  //     ora_id: 22144,
  //     longitude: 37.6316318,
  //     latitude: 55.7668393,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22145: {
  //     ora_id: 22145,
  //     longitude: 37.6346565,
  //     latitude: 55.7665286,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22146: {
  //     ora_id: 22146,
  //     longitude: 37.6365119,
  //     latitude: 55.7661318,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22147: {
  //     ora_id: 22147,
  //     longitude: 37.6435467,
  //     latitude: 55.770238,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22148: {
  //     ora_id: 22148,
  //     longitude: 37.6482651,
  //     latitude: 55.7734507,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22149: {
  //     ora_id: 22149,
  //     longitude: 37.6522492,
  //     latitude: 55.7745684,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22150: {
  //     ora_id: 22150,
  //     longitude: 37.6449317,
  //     latitude: 55.7827333,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22151: {
  //     ora_id: 22151,
  //     longitude: 37.6428484,
  //     latitude: 55.7862645,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22152: {
  //     ora_id: 22152,
  //     longitude: 37.6403114,
  //     latitude: 55.7922169,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22153: {
  //     ora_id: 22153,
  //     longitude: 37.6346334,
  //     latitude: 55.791628,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22154: {
  //     ora_id: 22154,
  //     longitude: 37.6318945,
  //     latitude: 55.7920945,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22155: {
  //     ora_id: 22155,
  //     longitude: 37.6301319,
  //     latitude: 55.8088829,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22156: {
  //     ora_id: 22156,
  //     longitude: 37.6285174,
  //     latitude: 55.8101823,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22157: {
  //     ora_id: 22157,
  //     longitude: 37.62763,
  //     latitude: 55.8165482,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22158: {
  //     ora_id: 22158,
  //     longitude: 37.6166882,
  //     latitude: 55.8203368,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22159: {
  //     ora_id: 22159,
  //     longitude: 37.610012,
  //     latitude: 55.8215855,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22160: {
  //     ora_id: 22160,
  //     longitude: 37.6099772,
  //     latitude: 55.8236115,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22161: {
  //     ora_id: 22161,
  //     longitude: 37.608755,
  //     latitude: 55.82375,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22162: {
  //     ora_id: 22162,
  //     longitude: 37.602744,
  //     latitude: 55.823702,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22163: {
  //     ora_id: 22163,
  //     longitude: 37.600938,
  //     latitude: 55.830234,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22164: {
  //     ora_id: 22164,
  //     longitude: 37.5861962,
  //     latitude: 55.829676,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22165: {
  //     ora_id: 22165,
  //     longitude: 37.5567308,
  //     latitude: 55.8253808,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22166: {
  //     ora_id: 22166,
  //     longitude: 37.5626888,
  //     latitude: 55.8177495,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22167: {
  //     ora_id: 22167,
  //     longitude: 37.5557988,
  //     latitude: 55.8168215,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22168: {
  //     ora_id: 22168,
  //     longitude: 37.5562904,
  //     latitude: 55.8136509,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  //   22169: {
  //     ora_id: 22169,
  //     longitude: 37.5532395,
  //     latitude: 55.8125544,
  //     dept_area_id: 1237,
  //     dept_id: 1257,
  //   },
  // },
  addressSelected: "",
  mapPosition: [55.7558, 37.6173],
  addressList: [
    // { id: 1, address: "5-я улица Ямского Поля, 7к2", selected: true },
    // { id: 2, address: "Авангардная улица, 13", selected: false },
    // { id: 3, address: "Кантемировская улица, 27А", selected: false },
  ],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setMapPosition: (state, action) => {
      state.mapPosition = action.payload;
      console.log("mapPositionState", state.mapPosition);
    },
    setAddressSelected: (state, action) => {
      state.addressSelected = action.payload;
      // console.log("addressSelected", state.addressSelected);
    },
    removeAddressSelected: (state, action) => {
      state.addressSelected = "";
    },
    addAddress: (state, action) => {
      const { address, selected } = action.payload;

      //if new address selected=true, then make all old addresses selected false
      if (selected) {
        state.addressList.forEach((item) => {
          item.selected = false;
        });
      }
      //to add new address to addressList
      state.addressList = [
        ...state.addressList,
        { id: uuidv4(), address: address, selected: selected },
      ];
    },
    updateAddress: (state, action) => {
      const { id, newAddress } = action.payload;
      state.addressList = state.addressList.map((item) =>
        item.id === id ? { ...item, address: newAddress } : item
      );
    },
    updateSelected: (state, action) => {
      const elementIndex = action.payload;

      state.addressList = state.addressList.map((item, index) => {
        const isSelected = index === elementIndex;
        return {
          ...item,
          selected: isSelected,
        };
      });
      // to update addressSelected according to changed selected property
      const selectedAddress = state.addressList.find((item) => item.selected);
      state.addressSelected = selectedAddress ? selectedAddress.address : "";
    },
    removeAddress: (state, action) => {
      state.addressList = state.addressList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAddressSelected,
  addAddress,
  updateAddress,
  updateSelected,
  removeAddress,
  removeAddressSelected,
  setMapPosition,
} = addressSlice.actions;

export default addressSlice.reducer;
