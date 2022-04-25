import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/number-field';
import '@vaadin/grid/vaadin-grid';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import {Binder} from '@hilla/form';
import {getById} from 'Frontend/generated/HistoryEndpoint';
import GroceryItemModel from 'Frontend/generated/com/example/application/data/GroceryItemModel';
import {BeforeEnterObserver, RouterLocation} from "@vaadin/router";

@customElement('history-item-view')
export class HistoryItemView extends View implements BeforeEnterObserver {

    @state()
    itemId: any;
    @state()
    private fields: String[] = [];
    private binder = new Binder(this, GroceryItemModel);

    async onBeforeEnter(location: RouterLocation) {
        this.itemId = location.params.itemId as string;
        this.fields = await getById(this.itemId);
    };

    render() {
        return html`
            <div class="p-m">
                <h3>История</h3>
                ${this.fields.map(value => html`<span>${value}</span><br>`)}
            </div>
        `;
    }
}
