const convertDate = (date) => {
    const d = new Date(date)
    return  `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
}

export default convertDate