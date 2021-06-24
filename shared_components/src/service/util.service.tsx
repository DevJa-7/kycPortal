import moment, { unitOfTime } from 'moment';

class UtilService {
    constructor() { }

    // Handle Moment and Date
    getNow() {
        return moment();
    }

    getToday() {
        return moment().startOf('day');
    }

    dt2moment(dt: Date) {
        if (dt) {
            return moment(dt);
        } else {
            return null;
        }
    }

    dt2format(dt?: Date, formatString?: string) {
        if (dt) {
            const date = this.dt2moment(dt);
            if (date) {
                return date.format(formatString);
            }
        }
        return null;
    }

    isValidDate(str: string, formatString?: string) {
        if (!formatString || !str) {
            return false;
        }

        const d = moment(str, formatString);
        if (d == null || !d.isValid()) {
            return false;
        }

        return str.indexOf(d.format(formatString)) >= 0;
    }

    getFromNow(dt: Date) {
        if (dt) {
            const date = this.dt2moment(dt);
            if (date) {
                return date.fromNow();
            }
        }
        return '';
    }

    getDiff(a: Date, b: Date, type = 'minutes') {
        if (!a || !b) {
            return 0;
        }

        return this.dt2moment(a)?.diff(this.dt2moment(b), type as unitOfTime.Diff , true) || 0;
    }

    getBase64(file: any, cb: any) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            cb((reader.result as string).split(',')[1]);
        };
        reader.onerror = function (error) {
            console.log("File Read Error: ", error);
        };
    }
}

export default new UtilService();