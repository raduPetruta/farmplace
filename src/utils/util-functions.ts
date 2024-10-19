export function getCurrentDate() {
    let separator='-';
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}` + " " + `${hours}:${minutes}:${seconds}`
}

export function sortByDate(arrayToSort: any) {
    return arrayToSort?.sort((a: any, b: any) => {
        // Split the date strings into components
        const [dateA, timeA] = a.createdAt.split(' ');
        const [dateB, timeB] = b.createdAt.split(' ');

        // Compare date parts
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If the dates are equal, compare time parts
        const [hoursA, minutesA, secondsA] = timeA.split(':').map(Number);
        const [hoursB, minutesB, secondsB] = timeB.split(':').map(Number);

        // Create a total seconds for comparison
        const totalSecondsA = hoursA * 3600 + minutesA * 60 + secondsA;
        const totalSecondsB = hoursB * 3600 + minutesB * 60 + secondsB;

        // Compare total seconds
        return totalSecondsA - totalSecondsB;
    });
}
