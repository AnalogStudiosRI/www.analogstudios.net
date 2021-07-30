/* eslint-disable max-len */
import { html, LitElement } from 'lit';

class HomeRouteComponent extends LitElement {

  constructor() {
    super();

    console.debug('ENTER: home page route');
  }

  connectedCallback() {
    super.connectedCallback();

    console.debug('// TODO - fetch events');
  }

  render() {
    console.debug('// TDOD - render events');
    return html`
      <h2>Coming Soon!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et dictum odio, et pulvinar massa. Aenean interdum gravida nunc. Duis iaculis lobortis nibh in mattis. Suspendisse tincidunt lorem sit amet ligula tristique convallis. Phasellus a sapien eros. Fusce eleifend pellentesque orci, suscipit sollicitudin ligula sollicitudin in. Etiam rutrum vehicula efficitur. Phasellus eu placerat eros, ac tincidunt massa. Vestibulum sed elit eu erat varius laoreet quis sit amet enim. Morbi congue, urna a vulputate scelerisque, purus turpis congue sapien, ac accumsan risus odio pharetra dolor. Integer aliquam sit amet tellus non bibendum. Suspendisse tincidunt tempor lectus, in egestas nulla porttitor et. Maecenas at lacus nibh. Nam ornare vulputate venenatis. Duis a purus augue.</p>
      <p>Aliquam tellus lacus, semper id bibendum vitae, facilisis nec urna. Morbi nunc mauris, facilisis a scelerisque vitae, convallis ut metus. Sed sed erat eu magna fermentum euismod sit amet id turpis. Suspendisse potenti. Suspendisse at mauris nibh. Nulla egestas magna non aliquam consequat. Maecenas condimentum lorem sem, ut dignissim tellus malesuada et. Maecenas tempor volutpat gravida. Nam fringilla commodo nibh vel semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse volutpat tortor enim, id ultrices magna pulvinar quis. Pellentesque nec imperdiet sapien. In fringilla, leo vitae commodo gravida, tellus nibh mollis massa, quis tincidunt eros sapien ac neque. Pellentesque neque dui, aliquet at ornare condimentum, aliquam sit amet tortor. Aliquam laoreet lacinia augue sed tempor.</p>
      <p>Aliquam neque augue, pulvinar ut libero a, sollicitudin rhoncus neque. Integer sed leo nulla. Curabitur sollicitudin justo vel nunc vestibulum, sit amet pretium diam tristique. Etiam convallis egestas blandit. Praesent aliquet justo consectetur orci imperdiet pellentesque at commodo felis. Phasellus venenatis consequat enim ut porta. Fusce non tristique nunc. Maecenas ac leo pellentesque, sagittis odio nec, maximus arcu. Sed scelerisque tortor id bibendum posuere. Mauris sit amet imperdiet risus. Nam semper posuere eros. Integer aliquet gravida arcu, at sagittis purus porta non. Aenean neque mauris, mollis sed iaculis vitae, finibus et odio. Proin venenatis finibus magna, at elementum arcu ultrices nec. Quisque id augue at magna tristique faucibus.</p>
      <p>Suspendisse mollis suscipit lorem. Sed semper purus et ullamcorper varius. Maecenas rhoncus porttitor enim, sed bibendum nibh venenatis et. Aliquam erat volutpat. Fusce tristique lacinia erat nec faucibus. Nam elementum magna nisi, vitae elementum est mollis at. Suspendisse vulputate, lacus non gravida vulputate, elit sapien semper felis, eu accumsan ipsum ante a augue. Fusce lobortis lectus in viverra auctor. Vestibulum consequat sapien at ligula tincidunt vulputate. Quisque odio arcu, rhoncus eget leo quis, efficitur tincidunt justo. Suspendisse sagittis sodales risus, ac rutrum dolor porta et. Morbi ut dignissim risus, sed elementum leo.</p>
      <p>Sed sagittis ut augue sed efficitur. Aliquam erat enim, faucibus ut cursus a, suscipit vitae turpis. Ut a auctor eros, et sagittis lectus. Nunc ac dolor et justo sagittis auctor. Aliquam nec orci pulvinar, eleifend augue et, euismod velit. Curabitur nec lorem consequat, auctor purus sit amet, tempus metus. Etiam sit amet varius nisl, et varius est. Aenean posuere dui quis tempor sagittis. Aliquam eget lectus leo. Sed vel tempor tortor, eu consectetur urna. Nullam vitae orci eget est convallis ullamcorper at in massa. Integer efficitur, nunc ac consectetur placerat, neque dui vulputate dolor, in mattis sapien dui sed nisi. Mauris porta dapibus sapien, in tempor augue mollis accumsan. Donec sit amet nunc id felis gravida blandit quis a leo.</p>
    `;
  }
}

customElements.define('as-route-home', HomeRouteComponent);