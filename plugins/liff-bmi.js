class BMIPlugin {
  constructor() {
    this.name = "bmi";
    this.date = "";
  }
  
  install(context, option) {
    this.date = option.date
    context.hooks.init.before(this.initBefore);
    context.hooks.init.after(this.initAfter.bind(this));
    return {
      today: this.localDate(context.liff.getLanguage(), option.date),
      greet: this.greeting,
      cal: this.calculate
    };
  }

  localDate(lang, date) {
    const locale = (lang === "en")? "en-US": "th-TH";
    return date.toLocaleDateString(locale, {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  }

  greeting(lang, profile) {
    const prefix = (lang === "en")? "Hello": "สวัสดี";
    return `${prefix} ${profile.displayName}!`;
  }

  calculate(height, weight) {
    const heightInMeter = height / 100;
    const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(2);
    let result = "none";
    if (bmi < 18.5) {
      result = "XS";
    } else if (bmi >= 18.5 && bmi < 23) {
      result = "S";
    } else if (bmi >= 23 && bmi < 25) {
      result = "M";
    } else if (bmi >= 25 && bmi < 30) {
      result = "L";
    } else if (bmi >= 30) {
      result = "XL";
    }
    return result;
  }

  initBefore() {
    console.log("before hook is called");
    return Promise.resolve();
  }

  initAfter() {
    console.log(`after hook is called at ${this.date.toLocaleTimeString()}`);
    return Promise.resolve();
  }
}