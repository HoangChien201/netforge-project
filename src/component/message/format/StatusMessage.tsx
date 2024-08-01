export function StateMessageFormat(state: number) {
    switch (state) {
        case 0:
            return 'Đang gửi'
        case 1:
            return 'Đã gửi'
        case 2:
            return 'Đã xem'
        case 3:
            return 'Gửi lỗi !'
    }
}