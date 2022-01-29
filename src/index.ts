class HitAndBlow {
  answerSource: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  answer: string[] = []
  tryCount: number = 0

  // constructor() {
  //   this.answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  //   this.answer = []
  //   this.tryCount = 0
  // }

  // 初期化処理
  setting() {
    const answerLength = 3

    while (this.answerSource.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length)
      const selectedItem = this.answerSource[randNum]
      if (!this.answerSource.includes(selectedItem)) {
        this.answerSource.push(selectedItem)
      }
    }
  }

  // ゲームそのものの処理
  async play(){
    const inputArr = (await promptInput('「,」区切りで3つの数字を入力してください')).split(',')
    const result = this.check(inputArr)
  }

  check(input: string[]): {hit: number, blow: number} {

    let hitCount= 0
    let blowCount= 0

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1
      } else if (this.answer.includes(val)) {
        blowCount += 1
      }
    })
    return {
      hit: hitCount,
      blow: blowCount,
    }
  }
}

const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? '\n' : ''))
}

const promptInput = async (text: string) => {
  // 受け取った文字をそのままprintLineへ渡す -> 質問文出力
  printLine(`\n${text}\n >`, false)
  const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
  return input.trim()
}

(async () => {
  // const name = await promptInput('名前を入力してください')
  // console.log(name)
  // const age = await promptInput('年齢を入力してください')
  // console.log(age)
  // process.exit()

  const hitAndBlow: HitAndBlow = new HitAndBlow()
  hitAndBlow.setting()
  await hitAndBlow.play()
})()

