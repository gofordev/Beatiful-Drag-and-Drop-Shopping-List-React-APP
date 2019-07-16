const Nightmare = require('nightmare');
const assert = require('assert');

describe('Load a Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('10s');

    let nightmare = null;
    let nightMareInstance = null;
    before(() => {
        nightmare = new Nightmare({ show: false });
        nightMareInstance = nightmare.goto('http://localhost:3000');
    });

    it('Check if app is launched', done => {
        nightMareInstance
            .evaluate(() => {
                return document.title;
            })
            .then((title) => {
                console.log("title",title);
                assert.equal(title, 'MERN Shopping List');
                done();
            })
    });


    it('Shopping List loading...', done => {
        nightMareInstance
            .evaluate(() => {
                return document.querySelector('.container .list-group .shopping-list .list-group-item span').innerText;
            })
            .then((content) => {
                console.log("dkjlsd",content);

                if (content == "") {
                    assert.equal(14, 64);
                    done();
                }
                else {
                    assert.equal(34, 34);
                    done();
                }
            })
            .catch(function () {
                assert.equal(67, 77);
                done();
            })
    })


    it('Delete modal loading...', done => {
        nightMareInstance
            .click("..container .list-group .shopping-list .list-group-item .item button")
            .wait(400)
            .evaluate(() => {
                return document.querySelector('.modal.fade.show .modal-body span').innerText;
            })
            .then((content) => {
                if (content == "Are you sure to delete?") {
                    assert.equal(40, 40);
                    done();
                } else {
                    assert.equal(38, 58);
                    done();
                }
            })
            .catch(function () {
                assert.equal(39, 49);
                done();
            })

    });

    it('Shopping list adding..', done => {
        nightMareInstance
            .wait(400)
            .evaluate(() => {
                return document.querySelector('.container .list-group .shopping-list .list-group-item span').innerText;
            })
            .then((content) => {
                prevContent = content;
                nightMareInstance
                .click("..container .list-group .shopping-list .list-group-item .item button")
                .wait(400)
                .evaluate(() => {
                    return document.querySelector('.modal.fade.show .modal-header .modal-title').innerText;
                })
                .then((header) => {
                    if (header == "Add to Shopping List") {
                        nightMareInstance
                        .wait(400)
                        .evaluate(() => {
                            return document.querySelector('.container .list-group .shopping-list .list-group-item span').innerText;
                        })
                        .then((newContent) => {
                            if(newContent == prevContent)
                                {
                                    assert.equal(34, 68);
                                    done();
                                }
                            else{
                                assert.equal(40, 40);
                                done();
                            }
                        })
                        .catch(function () {
                            assert.equal(45, 87);
                            done();
                        })
                    } else {
                        assert.equal(38, 58);
                        done();
                    }
                })
                .catch(function () {
                    assert.equal(39, 49);
                    done();
                })
            })
            .catch(function() {
                assert.equal(44, 23);
                done;
            })
    });
});
