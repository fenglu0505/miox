import React from 'react';
import Miox from 'miox';
import Engine from 'miox-react';
import Router from 'miox-router';

const app = new Miox({ max: 1 });
const route = new Router();

class A extends React.Component {
  constructor() {
    super();
    this.clickCallback = this.click.bind(this);
  }
  webViewDidEnter() {
    console.log('enter')
  }
  click() {
    this.$push('/b');
  }
  render() {
    return <div onClick={this.clickCallback}>hello world<p>adfaf</p></div>;
  }
}

class B extends React.Component {
  render() {
    return <div>B</div>;
  }
}

route.patch('/', async ctx => {
  await ctx.render(A);
});
route.patch('/b', async ctx => {
  await ctx.render(B);
});

app.set('engine', Engine);
app.use(route.routes());

export default app.listen();