export const textBirthday=[
    'Chúc bạn sinh nhật vui vẻ 🎂🎁🎉',
    'Chúc bạn có những phút giây thật vui vẻ 🎉🎉🎉',
    'Mau ăn chóng lớn 🎁🎁🎁',
    'Chúc bạn có những phút giây thật vui vẻ 🎂🎂🎂',
    'Tuổi mới xinh lại thêm xinh 🎂🎁🎉',
    'Chúc mừng sinh nhật nhé bạn của tôi! 🎂🎁🎉'
]

export function getTextBirthday(){
    const random=Math.floor(Math.random()* 3)
    const text=[]
    for(let i=random;i < random + 3;i++){
        text.push(textBirthday[i])
    }
    return text
}