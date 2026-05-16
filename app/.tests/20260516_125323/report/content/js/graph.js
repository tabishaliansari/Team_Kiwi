/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 324.0, "minX": 0.0, "maxY": 11874.0, "series": [{"data": [[0.0, 324.0], [0.1, 324.0], [0.2, 324.0], [0.3, 324.0], [0.4, 324.0], [0.5, 324.0], [0.6, 326.0], [0.7, 326.0], [0.8, 326.0], [0.9, 326.0], [1.0, 326.0], [1.1, 326.0], [1.2, 330.0], [1.3, 330.0], [1.4, 330.0], [1.5, 330.0], [1.6, 330.0], [1.7, 331.0], [1.8, 331.0], [1.9, 331.0], [2.0, 331.0], [2.1, 331.0], [2.2, 331.0], [2.3, 331.0], [2.4, 331.0], [2.5, 331.0], [2.6, 331.0], [2.7, 331.0], [2.8, 331.0], [2.9, 331.0], [3.0, 331.0], [3.1, 331.0], [3.2, 331.0], [3.3, 331.0], [3.4, 334.0], [3.5, 334.0], [3.6, 334.0], [3.7, 334.0], [3.8, 334.0], [3.9, 334.0], [4.0, 334.0], [4.1, 334.0], [4.2, 334.0], [4.3, 334.0], [4.4, 334.0], [4.5, 335.0], [4.6, 335.0], [4.7, 335.0], [4.8, 335.0], [4.9, 335.0], [5.0, 336.0], [5.1, 336.0], [5.2, 336.0], [5.3, 336.0], [5.4, 336.0], [5.5, 336.0], [5.6, 338.0], [5.7, 338.0], [5.8, 338.0], [5.9, 338.0], [6.0, 338.0], [6.1, 338.0], [6.2, 338.0], [6.3, 338.0], [6.4, 338.0], [6.5, 338.0], [6.6, 338.0], [6.7, 338.0], [6.8, 338.0], [6.9, 338.0], [7.0, 338.0], [7.1, 338.0], [7.2, 338.0], [7.3, 341.0], [7.4, 341.0], [7.5, 341.0], [7.6, 341.0], [7.7, 341.0], [7.8, 341.0], [7.9, 341.0], [8.0, 341.0], [8.1, 341.0], [8.2, 341.0], [8.3, 341.0], [8.4, 341.0], [8.5, 341.0], [8.6, 341.0], [8.7, 341.0], [8.8, 341.0], [8.9, 342.0], [9.0, 342.0], [9.1, 342.0], [9.2, 342.0], [9.3, 342.0], [9.4, 342.0], [9.5, 342.0], [9.6, 342.0], [9.7, 342.0], [9.8, 342.0], [9.9, 342.0], [10.0, 343.0], [10.1, 343.0], [10.2, 343.0], [10.3, 343.0], [10.4, 343.0], [10.5, 343.0], [10.6, 343.0], [10.7, 343.0], [10.8, 343.0], [10.9, 343.0], [11.0, 343.0], [11.1, 343.0], [11.2, 345.0], [11.3, 345.0], [11.4, 345.0], [11.5, 345.0], [11.6, 345.0], [11.7, 347.0], [11.8, 347.0], [11.9, 347.0], [12.0, 347.0], [12.1, 347.0], [12.2, 347.0], [12.3, 349.0], [12.4, 349.0], [12.5, 349.0], [12.6, 349.0], [12.7, 349.0], [12.8, 350.0], [12.9, 350.0], [13.0, 350.0], [13.1, 350.0], [13.2, 350.0], [13.3, 350.0], [13.4, 354.0], [13.5, 354.0], [13.6, 354.0], [13.7, 354.0], [13.8, 354.0], [13.9, 355.0], [14.0, 355.0], [14.1, 355.0], [14.2, 355.0], [14.3, 355.0], [14.4, 355.0], [14.5, 355.0], [14.6, 355.0], [14.7, 355.0], [14.8, 355.0], [14.9, 355.0], [15.0, 356.0], [15.1, 356.0], [15.2, 356.0], [15.3, 356.0], [15.4, 356.0], [15.5, 356.0], [15.6, 358.0], [15.7, 358.0], [15.8, 358.0], [15.9, 358.0], [16.0, 358.0], [16.1, 358.0], [16.2, 359.0], [16.3, 359.0], [16.4, 359.0], [16.5, 359.0], [16.6, 359.0], [16.7, 359.0], [16.8, 359.0], [16.9, 359.0], [17.0, 359.0], [17.1, 359.0], [17.2, 359.0], [17.3, 360.0], [17.4, 360.0], [17.5, 360.0], [17.6, 360.0], [17.7, 360.0], [17.8, 362.0], [17.9, 362.0], [18.0, 362.0], [18.1, 362.0], [18.2, 362.0], [18.3, 362.0], [18.4, 362.0], [18.5, 362.0], [18.6, 362.0], [18.7, 362.0], [18.8, 362.0], [18.9, 363.0], [19.0, 363.0], [19.1, 363.0], [19.2, 363.0], [19.3, 363.0], [19.4, 363.0], [19.5, 367.0], [19.6, 367.0], [19.7, 367.0], [19.8, 367.0], [19.9, 367.0], [20.0, 367.0], [20.1, 368.0], [20.2, 368.0], [20.3, 368.0], [20.4, 368.0], [20.5, 368.0], [20.6, 369.0], [20.7, 369.0], [20.8, 369.0], [20.9, 369.0], [21.0, 369.0], [21.1, 369.0], [21.2, 370.0], [21.3, 370.0], [21.4, 370.0], [21.5, 370.0], [21.6, 370.0], [21.7, 371.0], [21.8, 371.0], [21.9, 371.0], [22.0, 371.0], [22.1, 371.0], [22.2, 371.0], [22.3, 375.0], [22.4, 375.0], [22.5, 375.0], [22.6, 375.0], [22.7, 375.0], [22.8, 377.0], [22.9, 377.0], [23.0, 377.0], [23.1, 377.0], [23.2, 377.0], [23.3, 377.0], [23.4, 380.0], [23.5, 380.0], [23.6, 380.0], [23.7, 380.0], [23.8, 380.0], [23.9, 381.0], [24.0, 381.0], [24.1, 381.0], [24.2, 381.0], [24.3, 381.0], [24.4, 381.0], [24.5, 383.0], [24.6, 383.0], [24.7, 383.0], [24.8, 383.0], [24.9, 383.0], [25.0, 383.0], [25.1, 383.0], [25.2, 383.0], [25.3, 383.0], [25.4, 383.0], [25.5, 383.0], [25.6, 385.0], [25.7, 385.0], [25.8, 385.0], [25.9, 385.0], [26.0, 385.0], [26.1, 385.0], [26.2, 388.0], [26.3, 388.0], [26.4, 388.0], [26.5, 388.0], [26.6, 388.0], [26.7, 390.0], [26.8, 390.0], [26.9, 390.0], [27.0, 390.0], [27.1, 390.0], [27.2, 390.0], [27.3, 391.0], [27.4, 391.0], [27.5, 391.0], [27.6, 391.0], [27.7, 391.0], [27.8, 391.0], [27.9, 391.0], [28.0, 391.0], [28.1, 391.0], [28.2, 391.0], [28.3, 391.0], [28.4, 393.0], [28.5, 393.0], [28.6, 393.0], [28.7, 393.0], [28.8, 393.0], [28.9, 394.0], [29.0, 394.0], [29.1, 394.0], [29.2, 394.0], [29.3, 394.0], [29.4, 394.0], [29.5, 395.0], [29.6, 395.0], [29.7, 395.0], [29.8, 395.0], [29.9, 395.0], [30.0, 395.0], [30.1, 395.0], [30.2, 395.0], [30.3, 395.0], [30.4, 395.0], [30.5, 395.0], [30.6, 396.0], [30.7, 396.0], [30.8, 396.0], [30.9, 396.0], [31.0, 396.0], [31.1, 396.0], [31.2, 396.0], [31.3, 396.0], [31.4, 396.0], [31.5, 396.0], [31.6, 396.0], [31.7, 396.0], [31.8, 396.0], [31.9, 396.0], [32.0, 396.0], [32.1, 396.0], [32.2, 396.0], [32.3, 397.0], [32.4, 397.0], [32.5, 397.0], [32.6, 397.0], [32.7, 397.0], [32.8, 400.0], [32.9, 400.0], [33.0, 400.0], [33.1, 400.0], [33.2, 400.0], [33.3, 400.0], [33.4, 400.0], [33.5, 400.0], [33.6, 400.0], [33.7, 400.0], [33.8, 400.0], [33.9, 404.0], [34.0, 404.0], [34.1, 404.0], [34.2, 404.0], [34.3, 404.0], [34.4, 404.0], [34.5, 405.0], [34.6, 405.0], [34.7, 405.0], [34.8, 405.0], [34.9, 405.0], [35.0, 405.0], [35.1, 408.0], [35.2, 408.0], [35.3, 408.0], [35.4, 408.0], [35.5, 408.0], [35.6, 408.0], [35.7, 408.0], [35.8, 408.0], [35.9, 408.0], [36.0, 408.0], [36.1, 408.0], [36.2, 408.0], [36.3, 408.0], [36.4, 408.0], [36.5, 408.0], [36.6, 408.0], [36.7, 409.0], [36.8, 409.0], [36.9, 409.0], [37.0, 409.0], [37.1, 409.0], [37.2, 409.0], [37.3, 409.0], [37.4, 409.0], [37.5, 409.0], [37.6, 409.0], [37.7, 409.0], [37.8, 411.0], [37.9, 411.0], [38.0, 411.0], [38.1, 411.0], [38.2, 411.0], [38.3, 411.0], [38.4, 413.0], [38.5, 413.0], [38.6, 413.0], [38.7, 413.0], [38.8, 413.0], [38.9, 414.0], [39.0, 414.0], [39.1, 414.0], [39.2, 414.0], [39.3, 414.0], [39.4, 414.0], [39.5, 415.0], [39.6, 415.0], [39.7, 415.0], [39.8, 415.0], [39.9, 415.0], [40.0, 415.0], [40.1, 418.0], [40.2, 418.0], [40.3, 418.0], [40.4, 418.0], [40.5, 418.0], [40.6, 418.0], [40.7, 418.0], [40.8, 418.0], [40.9, 418.0], [41.0, 418.0], [41.1, 418.0], [41.2, 419.0], [41.3, 419.0], [41.4, 419.0], [41.5, 419.0], [41.6, 419.0], [41.7, 422.0], [41.8, 422.0], [41.9, 422.0], [42.0, 422.0], [42.1, 422.0], [42.2, 422.0], [42.3, 422.0], [42.4, 422.0], [42.5, 422.0], [42.6, 422.0], [42.7, 422.0], [42.8, 427.0], [42.9, 427.0], [43.0, 427.0], [43.1, 427.0], [43.2, 427.0], [43.3, 427.0], [43.4, 432.0], [43.5, 432.0], [43.6, 432.0], [43.7, 432.0], [43.8, 432.0], [43.9, 443.0], [44.0, 443.0], [44.1, 443.0], [44.2, 443.0], [44.3, 443.0], [44.4, 443.0], [44.5, 444.0], [44.6, 444.0], [44.7, 444.0], [44.8, 444.0], [44.9, 444.0], [45.0, 444.0], [45.1, 447.0], [45.2, 447.0], [45.3, 447.0], [45.4, 447.0], [45.5, 447.0], [45.6, 465.0], [45.7, 465.0], [45.8, 465.0], [45.9, 465.0], [46.0, 465.0], [46.1, 465.0], [46.2, 468.0], [46.3, 468.0], [46.4, 468.0], [46.5, 468.0], [46.6, 468.0], [46.7, 470.0], [46.8, 470.0], [46.9, 470.0], [47.0, 470.0], [47.1, 470.0], [47.2, 470.0], [47.3, 477.0], [47.4, 477.0], [47.5, 477.0], [47.6, 477.0], [47.7, 477.0], [47.8, 501.0], [47.9, 501.0], [48.0, 501.0], [48.1, 501.0], [48.2, 501.0], [48.3, 501.0], [48.4, 507.0], [48.5, 507.0], [48.6, 507.0], [48.7, 507.0], [48.8, 507.0], [48.9, 511.0], [49.0, 511.0], [49.1, 511.0], [49.2, 511.0], [49.3, 511.0], [49.4, 511.0], [49.5, 511.0], [49.6, 511.0], [49.7, 511.0], [49.8, 511.0], [49.9, 511.0], [50.0, 511.0], [50.1, 512.0], [50.2, 512.0], [50.3, 512.0], [50.4, 512.0], [50.5, 512.0], [50.6, 515.0], [50.7, 515.0], [50.8, 515.0], [50.9, 515.0], [51.0, 515.0], [51.1, 515.0], [51.2, 519.0], [51.3, 519.0], [51.4, 519.0], [51.5, 519.0], [51.6, 519.0], [51.7, 521.0], [51.8, 521.0], [51.9, 521.0], [52.0, 521.0], [52.1, 521.0], [52.2, 521.0], [52.3, 523.0], [52.4, 523.0], [52.5, 523.0], [52.6, 523.0], [52.7, 523.0], [52.8, 528.0], [52.9, 528.0], [53.0, 528.0], [53.1, 528.0], [53.2, 528.0], [53.3, 528.0], [53.4, 537.0], [53.5, 537.0], [53.6, 537.0], [53.7, 537.0], [53.8, 537.0], [53.9, 545.0], [54.0, 545.0], [54.1, 545.0], [54.2, 545.0], [54.3, 545.0], [54.4, 545.0], [54.5, 559.0], [54.6, 559.0], [54.7, 559.0], [54.8, 559.0], [54.9, 559.0], [55.0, 559.0], [55.1, 563.0], [55.2, 563.0], [55.3, 563.0], [55.4, 563.0], [55.5, 563.0], [55.6, 564.0], [55.7, 564.0], [55.8, 564.0], [55.9, 564.0], [56.0, 564.0], [56.1, 564.0], [56.2, 585.0], [56.3, 585.0], [56.4, 585.0], [56.5, 585.0], [56.6, 585.0], [56.7, 589.0], [56.8, 589.0], [56.9, 589.0], [57.0, 589.0], [57.1, 589.0], [57.2, 589.0], [57.3, 591.0], [57.4, 591.0], [57.5, 591.0], [57.6, 591.0], [57.7, 591.0], [57.8, 592.0], [57.9, 592.0], [58.0, 592.0], [58.1, 592.0], [58.2, 592.0], [58.3, 592.0], [58.4, 596.0], [58.5, 596.0], [58.6, 596.0], [58.7, 596.0], [58.8, 596.0], [58.9, 612.0], [59.0, 612.0], [59.1, 612.0], [59.2, 612.0], [59.3, 612.0], [59.4, 612.0], [59.5, 614.0], [59.6, 614.0], [59.7, 614.0], [59.8, 614.0], [59.9, 614.0], [60.0, 614.0], [60.1, 616.0], [60.2, 616.0], [60.3, 616.0], [60.4, 616.0], [60.5, 616.0], [60.6, 626.0], [60.7, 626.0], [60.8, 626.0], [60.9, 626.0], [61.0, 626.0], [61.1, 626.0], [61.2, 629.0], [61.3, 629.0], [61.4, 629.0], [61.5, 629.0], [61.6, 629.0], [61.7, 644.0], [61.8, 644.0], [61.9, 644.0], [62.0, 644.0], [62.1, 644.0], [62.2, 644.0], [62.3, 648.0], [62.4, 648.0], [62.5, 648.0], [62.6, 648.0], [62.7, 648.0], [62.8, 659.0], [62.9, 659.0], [63.0, 659.0], [63.1, 659.0], [63.2, 659.0], [63.3, 659.0], [63.4, 668.0], [63.5, 668.0], [63.6, 668.0], [63.7, 668.0], [63.8, 668.0], [63.9, 675.0], [64.0, 675.0], [64.1, 675.0], [64.2, 675.0], [64.3, 675.0], [64.4, 675.0], [64.5, 675.0], [64.6, 675.0], [64.7, 675.0], [64.8, 675.0], [64.9, 675.0], [65.0, 675.0], [65.1, 677.0], [65.2, 677.0], [65.3, 677.0], [65.4, 677.0], [65.5, 677.0], [65.6, 684.0], [65.7, 684.0], [65.8, 684.0], [65.9, 684.0], [66.0, 684.0], [66.1, 684.0], [66.2, 716.0], [66.3, 716.0], [66.4, 716.0], [66.5, 716.0], [66.6, 716.0], [66.7, 719.0], [66.8, 719.0], [66.9, 719.0], [67.0, 719.0], [67.1, 719.0], [67.2, 719.0], [67.3, 722.0], [67.4, 722.0], [67.5, 722.0], [67.6, 722.0], [67.7, 722.0], [67.8, 765.0], [67.9, 765.0], [68.0, 765.0], [68.1, 765.0], [68.2, 765.0], [68.3, 765.0], [68.4, 772.0], [68.5, 772.0], [68.6, 772.0], [68.7, 772.0], [68.8, 772.0], [68.9, 777.0], [69.0, 777.0], [69.1, 777.0], [69.2, 777.0], [69.3, 777.0], [69.4, 777.0], [69.5, 813.0], [69.6, 813.0], [69.7, 813.0], [69.8, 813.0], [69.9, 813.0], [70.0, 813.0], [70.1, 822.0], [70.2, 822.0], [70.3, 822.0], [70.4, 822.0], [70.5, 822.0], [70.6, 835.0], [70.7, 835.0], [70.8, 835.0], [70.9, 835.0], [71.0, 835.0], [71.1, 835.0], [71.2, 842.0], [71.3, 842.0], [71.4, 842.0], [71.5, 842.0], [71.6, 842.0], [71.7, 846.0], [71.8, 846.0], [71.9, 846.0], [72.0, 846.0], [72.1, 846.0], [72.2, 846.0], [72.3, 863.0], [72.4, 863.0], [72.5, 863.0], [72.6, 863.0], [72.7, 863.0], [72.8, 866.0], [72.9, 866.0], [73.0, 866.0], [73.1, 866.0], [73.2, 866.0], [73.3, 866.0], [73.4, 875.0], [73.5, 875.0], [73.6, 875.0], [73.7, 875.0], [73.8, 875.0], [73.9, 876.0], [74.0, 876.0], [74.1, 876.0], [74.2, 876.0], [74.3, 876.0], [74.4, 876.0], [74.5, 880.0], [74.6, 880.0], [74.7, 880.0], [74.8, 880.0], [74.9, 880.0], [75.0, 880.0], [75.1, 901.0], [75.2, 901.0], [75.3, 901.0], [75.4, 901.0], [75.5, 901.0], [75.6, 909.0], [75.7, 909.0], [75.8, 909.0], [75.9, 909.0], [76.0, 909.0], [76.1, 909.0], [76.2, 920.0], [76.3, 920.0], [76.4, 920.0], [76.5, 920.0], [76.6, 920.0], [76.7, 923.0], [76.8, 923.0], [76.9, 923.0], [77.0, 923.0], [77.1, 923.0], [77.2, 923.0], [77.3, 928.0], [77.4, 928.0], [77.5, 928.0], [77.6, 928.0], [77.7, 928.0], [77.8, 930.0], [77.9, 930.0], [78.0, 930.0], [78.1, 930.0], [78.2, 930.0], [78.3, 930.0], [78.4, 944.0], [78.5, 944.0], [78.6, 944.0], [78.7, 944.0], [78.8, 944.0], [78.9, 951.0], [79.0, 951.0], [79.1, 951.0], [79.2, 951.0], [79.3, 951.0], [79.4, 951.0], [79.5, 963.0], [79.6, 963.0], [79.7, 963.0], [79.8, 963.0], [79.9, 963.0], [80.0, 963.0], [80.1, 964.0], [80.2, 964.0], [80.3, 964.0], [80.4, 964.0], [80.5, 964.0], [80.6, 973.0], [80.7, 973.0], [80.8, 973.0], [80.9, 973.0], [81.0, 973.0], [81.1, 973.0], [81.2, 983.0], [81.3, 983.0], [81.4, 983.0], [81.5, 983.0], [81.6, 983.0], [81.7, 991.0], [81.8, 991.0], [81.9, 991.0], [82.0, 991.0], [82.1, 991.0], [82.2, 991.0], [82.3, 1002.0], [82.4, 1002.0], [82.5, 1002.0], [82.6, 1002.0], [82.7, 1002.0], [82.8, 1008.0], [82.9, 1008.0], [83.0, 1008.0], [83.1, 1008.0], [83.2, 1008.0], [83.3, 1008.0], [83.4, 1021.0], [83.5, 1021.0], [83.6, 1021.0], [83.7, 1021.0], [83.8, 1021.0], [83.9, 1024.0], [84.0, 1024.0], [84.1, 1024.0], [84.2, 1024.0], [84.3, 1024.0], [84.4, 1024.0], [84.5, 1043.0], [84.6, 1043.0], [84.7, 1043.0], [84.8, 1043.0], [84.9, 1043.0], [85.0, 1043.0], [85.1, 1079.0], [85.2, 1079.0], [85.3, 1079.0], [85.4, 1079.0], [85.5, 1079.0], [85.6, 1137.0], [85.7, 1137.0], [85.8, 1137.0], [85.9, 1137.0], [86.0, 1137.0], [86.1, 1137.0], [86.2, 1158.0], [86.3, 1158.0], [86.4, 1158.0], [86.5, 1158.0], [86.6, 1158.0], [86.7, 1167.0], [86.8, 1167.0], [86.9, 1167.0], [87.0, 1167.0], [87.1, 1167.0], [87.2, 1167.0], [87.3, 1201.0], [87.4, 1201.0], [87.5, 1201.0], [87.6, 1201.0], [87.7, 1201.0], [87.8, 1221.0], [87.9, 1221.0], [88.0, 1221.0], [88.1, 1221.0], [88.2, 1221.0], [88.3, 1221.0], [88.4, 1248.0], [88.5, 1248.0], [88.6, 1248.0], [88.7, 1248.0], [88.8, 1248.0], [88.9, 1252.0], [89.0, 1252.0], [89.1, 1252.0], [89.2, 1252.0], [89.3, 1252.0], [89.4, 1252.0], [89.5, 1260.0], [89.6, 1260.0], [89.7, 1260.0], [89.8, 1260.0], [89.9, 1260.0], [90.0, 1260.0], [90.1, 1281.0], [90.2, 1281.0], [90.3, 1281.0], [90.4, 1281.0], [90.5, 1281.0], [90.6, 1318.0], [90.7, 1318.0], [90.8, 1318.0], [90.9, 1318.0], [91.0, 1318.0], [91.1, 1318.0], [91.2, 1327.0], [91.3, 1327.0], [91.4, 1327.0], [91.5, 1327.0], [91.6, 1327.0], [91.7, 1383.0], [91.8, 1383.0], [91.9, 1383.0], [92.0, 1383.0], [92.1, 1383.0], [92.2, 1383.0], [92.3, 1390.0], [92.4, 1390.0], [92.5, 1390.0], [92.6, 1390.0], [92.7, 1390.0], [92.8, 1512.0], [92.9, 1512.0], [93.0, 1512.0], [93.1, 1512.0], [93.2, 1512.0], [93.3, 1512.0], [93.4, 1611.0], [93.5, 1611.0], [93.6, 1611.0], [93.7, 1611.0], [93.8, 1611.0], [93.9, 1636.0], [94.0, 1636.0], [94.1, 1636.0], [94.2, 1636.0], [94.3, 1636.0], [94.4, 1636.0], [94.5, 1639.0], [94.6, 1639.0], [94.7, 1639.0], [94.8, 1639.0], [94.9, 1639.0], [95.0, 1639.0], [95.1, 1692.0], [95.2, 1692.0], [95.3, 1692.0], [95.4, 1692.0], [95.5, 1692.0], [95.6, 1702.0], [95.7, 1702.0], [95.8, 1702.0], [95.9, 1702.0], [96.0, 1702.0], [96.1, 1702.0], [96.2, 1724.0], [96.3, 1724.0], [96.4, 1724.0], [96.5, 1724.0], [96.6, 1724.0], [96.7, 1762.0], [96.8, 1762.0], [96.9, 1762.0], [97.0, 1762.0], [97.1, 1762.0], [97.2, 1762.0], [97.3, 2042.0], [97.4, 2042.0], [97.5, 2042.0], [97.6, 2042.0], [97.7, 2042.0], [97.8, 2125.0], [97.9, 2125.0], [98.0, 2125.0], [98.1, 2125.0], [98.2, 2125.0], [98.3, 2125.0], [98.4, 2144.0], [98.5, 2144.0], [98.6, 2144.0], [98.7, 2144.0], [98.8, 2144.0], [98.9, 2613.0], [99.0, 2613.0], [99.1, 2613.0], [99.2, 2613.0], [99.3, 2613.0], [99.4, 2613.0], [99.5, 11874.0], [99.6, 11874.0], [99.7, 11874.0], [99.8, 11874.0], [99.9, 11874.0], [100.0, 11874.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 300.0, "maxY": 59.0, "series": [{"data": [[2100.0, 2.0], [600.0, 13.0], [2600.0, 1.0], [700.0, 6.0], [11800.0, 1.0], [800.0, 10.0], [900.0, 13.0], [1000.0, 6.0], [1100.0, 3.0], [300.0, 59.0], [1200.0, 6.0], [1300.0, 4.0], [1500.0, 1.0], [1600.0, 4.0], [400.0, 27.0], [1700.0, 3.0], [500.0, 20.0], [2000.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 11800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 86.0, "series": [{"data": [[0.0, 86.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 80.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 12.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 9.461111111111116, "minX": 1.77891618E12, "maxY": 9.461111111111116, "series": [{"data": [[1.77891618E12, 9.461111111111116]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77891618E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 491.1428571428571, "minX": 1.0, "maxY": 11874.0, "series": [{"data": [[8.0, 580.3333333333334], [4.0, 1692.0], [2.0, 1221.0], [1.0, 11874.0], [9.0, 491.1428571428571], [5.0, 1613.3333333333333], [10.0, 653.2933333333336], [6.0, 791.3333333333334], [3.0, 973.0], [7.0, 861.8571428571429]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[9.461111111111116, 744.0055555555554]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 351.0, "minX": 1.77891618E12, "maxY": 1468.8333333333333, "series": [{"data": [[1.77891618E12, 1468.8333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.77891618E12, 351.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77891618E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 744.0055555555554, "minX": 1.77891618E12, "maxY": 744.0055555555554, "series": [{"data": [[1.77891618E12, 744.0055555555554]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77891618E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 743.861111111111, "minX": 1.77891618E12, "maxY": 743.861111111111, "series": [{"data": [[1.77891618E12, 743.861111111111]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77891618E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 65.62777777777777, "minX": 1.77891618E12, "maxY": 65.62777777777777, "series": [{"data": [[1.77891618E12, 65.62777777777777]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77891618E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 324.0, "minX": 1.77891618E12, "maxY": 2613.0, "series": [{"data": [[1.77891618E12, 2613.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.77891618E12, 324.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.77891618E12, 1262.1]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.77891618E12, 2242.490000000004]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.77891618E12, 511.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.77891618E12, 1641.6499999999992]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77891618E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 389.5, "minX": 1.0, "maxY": 11874.0, "series": [{"data": [[8.0, 962.0], [1.0, 1221.0], [17.0, 473.0], [18.0, 411.5], [9.0, 523.0], [5.0, 1611.0], [10.0, 531.5], [13.0, 389.5], [14.0, 513.5], [15.0, 596.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1.0, 11874.0], [17.0, 777.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 389.5, "minX": 1.0, "maxY": 11874.0, "series": [{"data": [[8.0, 962.0], [1.0, 1221.0], [17.0, 473.0], [18.0, 411.5], [9.0, 523.0], [5.0, 1611.0], [10.0, 531.5], [13.0, 389.5], [14.0, 513.5], [15.0, 596.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1.0, 11874.0], [17.0, 776.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.77891618E12, "maxY": 3.0, "series": [{"data": [[1.77891618E12, 3.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77891618E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.77891618E12, "maxY": 2.966666666666667, "series": [{"data": [[1.77891618E12, 2.966666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.77891618E12, 0.03333333333333333]], "isOverall": false, "label": "502", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.77891618E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.77891618E12, "maxY": 2.966666666666667, "series": [{"data": [[1.77891618E12, 2.966666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}, {"data": [[1.77891618E12, 0.03333333333333333]], "isOverall": false, "label": "HTTP Request-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77891618E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.77891618E12, "maxY": 2.966666666666667, "series": [{"data": [[1.77891618E12, 2.966666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.77891618E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.77891618E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

