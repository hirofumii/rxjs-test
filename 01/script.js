'use strict';

(function() {
    console.group('basic');

    /**
     * basic
     */
    
    Rx.Observable.from([1, 2, 3]).subscribe(n => {
        console.log(n);
    },
    error => {
        console.log('error');
    },
    () => {
        console.log('Completed!');
    });

    console.groupEnd();
})();


(function() {
    console.group('map()');

    /**
     * map
     * 値を別の値に変換
     */

    Rx.Observable.from([1, 2, 3]).map(n => {
        return n * 2;
    }).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();

(function() {
    console.group('filter()');

    /**
     * filter
     * 条件に合うものだけを抽出
     */

    Rx.Observable.from([1, 2, 3]).filter(n => {
        return n % 2 == 1;
    }).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();

(function() {
    console.group('flatMap()');

    /**
     * flatMap
     * ストリームを平滑化
     */

    const stream1 = Rx.Observable.from([10, 20, 30]);
    const stream2 = n => {
        return Rx.Observable.from([n + 1, n + 2, n + 3]);
    };
    stream1.flatMap(n => {
        return stream2(n);
    }).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();


(function() {
    console.group('throttle()');

    /**
     * throttle
     * 指定した時間内に発生した連続するイベントを無視する
     */

    Rx.Observable.fromEvent(document, 'click').throttle(250).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();

(function() {
    console.group('merge()');

    /**
     * merge
     * 複数のストリームを一つのストリームへまとめる
     */

    const stream1 = Rx.Observable.from([1, 2, 3, 4, 5]);
    const stream2 = Rx.Observable.from([10, 20, 30]);

    Rx.Observable.merge(stream1, stream2).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();

(function() {
    console.group('combineLatest()');

    /**
     * combineLatest
     */

    const stream1 = Rx.Observable.from([1, null, null, 2, 3]).filter(n => {
        return n !== null;
    });
    const stream2 = Rx.Observable.from([null, 10, 20, null, null, 30]).filter(n => {
        return n !== null;
    });

    Rx.Observable.combineLatest(stream1, stream2, (n1, n2) => {
        return n1 + n2;
    }).subscribe(n => {
        console.log(n);
    });

    console.groupEnd();
})();
