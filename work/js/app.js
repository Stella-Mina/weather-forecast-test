//"get-weather"のidを持つボタンがクリックされたときの処理
document.getElementById("get-weather").addEventListener("click", async function () {
  // 選ばれた都市コード（例: 東京なら 130000）を取り出す
  let cityCode = document.getElementById("city-select").value;

  //もし都市コードが選択されていない場合
  if (!cityCode) {
    //アラートを表示
    alert("都市を選択してください。");
    // 処理を終了
    return;
  }

  // 天気予報を取りに行くURLを作る。${cityCode} の部分が、都市コードに差し替わる
  let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

  // URLにアクセスして天気情報を取得
  try {
    //awaitを使ってURLから持ってくるデータの結果を待つ
    let response = await fetch(url);
    // もし帰ってきた結果が正常でない場合は
    if (!response.ok) {
      //プログラムの処理を途中で止めて、問題が起きたことを知らせる
      throw new Error("天気情報の取得に失敗しました。");
    }

    // 取得したデータをJSON形式に変換、awaitで結果を待つ
    let weather = await response.json();
    // 取得した天気情報をコンソールに表示
    console.log(weather);

    //気象庁APIから返ってきたweather(天気データの配列)の[0]=配列の1番目の要素を取得
    let area = weather[0].timeSeries[0].areas[0];
    //気温情報を取り出す。値が存在しないとき、- を代入
    let tempsArea = weather[1].tempAverage?.areas?.[0] || { max: "-", min: "-" };


      //HTML内で id="publishingOffice" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し気象庁の発表者を表示
      document.getElementById("publishingOffice").lastElementChild.textContent =
        weather[0].publishingOffice;

      //HTML内で id="reportDatetime" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し天気予報の報告日時を表示
      document.getElementById("reportDatetime").lastElementChild.textContent =
        weather[0].reportDatetime;

      //HTML内で id="targetArea" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し対象地域の名前を表示
      document.getElementById("targetArea").lastElementChild.textContent =
        area.area.name;

      //HTML内で id="today" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し今日の天気を表示
      document.getElementById("today").lastElementChild.textContent =
        area.weathers[0];

      //HTML内で id="tomorrow" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し明日の天気を表示
      document.getElementById("tomorrow").lastElementChild.textContent =
        area.weathers[1];

      //HTML内で id="dayAfterTomorrow" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し明後日の天気を表示
      document.getElementById("dayAfterTomorrow").lastElementChild.textContent =
        area.weathers[2];

      //HTML内で id="todayWeather" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し最高気温を表示
      document.getElementById("todayHighTemperature").lastElementChild.textContent =
        tempsArea.max + "℃";

      //HTML内で id="todayWeather" の要素を取得し最後の子要素(<td></td>)の要素の中の文字列を取得し最低気温を表示
      document.getElementById("todayLowTemperature").lastElementChild.textContent =
        tempsArea.min + "℃";
  } catch (error) {
    // エラーが発生した場合、アラートを表示
    alert(error.message);
  }
});
