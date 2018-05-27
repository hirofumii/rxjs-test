
$(function() {
    const inputStream = Rx.Observable.fromEvent($('#query'), 'input').map(e => {
        return e.target.value;
    });

    const queryStream = inputStream.throttle(300).filter(text => {
        return text.length > 0;
    }).distinctUntilChanged().map(text => {
        return 'https://api.github.com/search/repositories?q=' + text;
    });

    const executingStream = new Rx.Subject();
    const repositoriesStream = queryStream.flatMap(query => {
        executingStream.onNext(true);
        return Rx.Observable.fromPromise($.ajax({
            url: query
        })).finally(() => {
            executingStream.onNext(false);
        });
    }).map(res => {
        return res.items;
    });

    executingStream.subscribe(executing => {
        if (executing) {
            $('#result').prepend('loading...');
        }
    });

    const htmlStream = repositoriesStream.map(items => {
        return items.map(repo => {
            const $p = $('<p>').append($('<a>').attr({
                href: repo.html_url
            }).append(repo.description));
            return $p[0].outerHTML;
        });
    });

    htmlStream.subscribe(array => {
        const html = array.reduce((prev, curr) => {
            return prev += curr;
        }, '');
        $('#result').empty();
        const $table = $('<table>').addClass('table');
        $.each(array, (index, element) => {
            $table.append($('<tr>').append($('<td>').append(element)));
        });
        $('#result').append($table);
    });
});
