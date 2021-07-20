/**
 * 변수로 Date객체를 넣으면 yyyy-MM-dd 로 바꿔준다
 * @param date Date객체 ex)new Date()
 * @returns {string} yyyy-MM-dd
 */
const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
}

export default getFormatDate;