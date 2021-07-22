/**
 * 오늘로부터 매개변수로 넣은 날짜까지 남은 일을 계산한다 
 * @param date 오늘보다 더 먼 미래
 * @returns {number} 오늘로부터 남은 일
 */
const getLeftDate = (date) => {
    let oneDay = 24 * 60 * 60 * 1000;
    return (Math.floor(Math.abs((new Date(date).getTime() - new Date().getTime()) / oneDay)));
}

export default getLeftDate