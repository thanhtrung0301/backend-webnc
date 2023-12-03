const newsController = {};
const newsSchema = require("./newsSchema");
const cheerio = require('cheerio');
const request = require('request-promise');
const moment = require('moment');


newsController.getCrawlNews = async (req, res, next) => {
  try {
    const list = await newsController.getContent();
    if (list.length === 0) {
      console.log('call api err');
      return;
    }
    for (let i of list) {
      const one = new newsSchema({
        categories: [
          {
            name: 'Xã hội',
            url: 'xa-hoi',
            slug: 'xa-hoi',
          },
        ],
        img_hor: i.url_img ? i.url_img : '',
        description: i.description,
        title_google: i.title,
        url: i.link.replace('https://vnexpress.net/', '').replace('.html', ''),
        content: i.content,
        title: i.title,
        post_url: i.link.replace('https://vnexpress.net', '').replace('.html', ''),
        title_search: i.link.replace('https://vnexpress.net/', '').replace('.html', ''),
        news_id: i.news_id,
        publishedAt: moment().format(),
        tags: [{ label: 'tin mới', slug: 'tin-moi' }],
        from_source: 'vnexpress.net',
      });
      await one.save();
    }
    return res.status(200).send({
      message: "Successfully!"
    });
  } catch (error) {
    console.log(error);
  }
};

newsController.getContent = async () => {
  try {
    const list = await newsController.LishLink(`https://vnexpress.net/tin-tuc-24h`);
    let newLinks = [];
    for (let i of list) {
      if (i.link) {
        let html = await request(i.link);
        let $ = cheerio.load(html); // load HTML
        let data = '';
        $('section.section.page-detail.top-detail > div.container > div.sidebar-1 > article.fck_detail').each((index, testEl) => {
          data = $(testEl).html();
          const cutPoint = data.indexOf(`<p class="Normal" style="text-align:right;">`);
          data = data.slice(0, cutPoint) + '</article>';
        });
        if (data) {
          newLinks.push({ ...i, content: data, category: ['5f92ec4e2232780205439907'] });
        }
        // await sleep(TIME_CRAWL_NEWS);
      }
    }
    return newLinks;
  } catch (error) {
    console.log(error);
  }
};

newsController.LishLink = async (page) => {
  try {
    const listAllNews = await newsSchema.find().select('news_id').sort({ publishedAt: -1 });
    let html = await request(page);
    let $ = cheerio.load(html); // load HTML
    let links = [];
    $('div.width_common.list-news-subfolder > article.item-news.item-news-common').each((index, item) => {
      let itemAdd = {};
      $(item)
        .find('h3.title-news > a')
        .each((index1, title) => {
          itemAdd = {
            ...itemAdd,
            link: $(title).attr('href'),
            title: $(title).text(),
            news_id: $(title).attr('href').replace('https://', '').replace('.html', '').slice(-7),
          };
        });
      $(item)
        .find('p.description > a')
        .each((index1, title) => {
          itemAdd = {
            ...itemAdd,
            description: $(title).text(),
          };
        });
      $(item)
        .find('div.thumb-art > a.thumb.thumb-5x3 > picture > img')
        .each((index1, title) => {
          itemAdd = {
            ...itemAdd,
            url_img: $(title).attr('data-src') || $(title).attr('src'),
          };
        });
      const check = listAllNews.filter((e) => e.news_id === itemAdd.news_id);
      if (check.length === 0) {
        links.push(itemAdd);
      }
    });

    // for (let y = 1; y < 31; y++) {
    //   let itemAdd = {};
    //   let count = 0;
    //   // lấy link và title news
    //   $('div.width_common.list-news-subfolder > article.item-news.item-news-common > h3.title-news > a').each((index, item2) => {
    //     if (y === Number($(item2).attr('data-medium').replace('Item-', ''))) {
    //       const checkDuplicate = $(item2).attr('href').replace('https://', '').replace('.html', '').slice(-7);
    //       let resultDuplicate = false;
    //       for (let i of listAllNews) {
    //         if (i.news_id === checkDuplicate) {
    //           resultDuplicate = true;
    //         }
    //       }
    //       if (!resultDuplicate) {
    //         itemAdd = {
    //           link: $(item2).attr('href'),
    //           title: $(item2).text().replace(/\n/g, ''),
    //         };
    //       }
    //     }
    //   });
    //   // lấy description news
    //   $('div.width_common.list-news-subfolder > article.item-news.item-news-common > p.description > a').each((index, item1) => {
    //     if (y === Number($(item1).attr('data-medium').replace('Item-', ''))) {
    //       const checkDuplicate = $(item1).attr('href').replace('https://', '').replace('.html', '').slice(-7);
    //       let resultDuplicate = false;
    //       for (let i of listAllNews) {
    //         if (i.news_id === checkDuplicate) {
    //           resultDuplicate = true;
    //         }
    //       }
    //       if (!resultDuplicate) {
    //         itemAdd = {
    //           ...itemAdd,
    //           description: $(item1).text().replace(/\n/g, ''),
    //         };
    //       }
    //     }
    //   });
    //   // lấy img news
    //   $('div.width_common.list-news-subfolder > article.item-news.item-news-common > div.thumb-art > a.thumb.thumb-5x3 > picture > img').each((index, item3) => {
    //     count = count + 1;
    //     if (y === count) {
    //       itemAdd = {
    //         ...itemAdd,
    //         url_img: $(item3).attr('src'),
    //       };
    //     }
    //   });
    //   links.push({...itemAdd});
    // }
    return links;
  } catch (error) {
    console.log(error);
  }
};

module.exports = newsController;
