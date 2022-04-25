import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/number-field';
import '@vaadin/grid/vaadin-grid';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import {Binder} from '@hilla/form';
import {getAllChangedGrocery} from 'Frontend/generated/HistoryEndpoint';
import GroceryItem from 'Frontend/generated/com/example/application/data/GroceryItem';
import GroceryItemModel from 'Frontend/generated/com/example/application/data/GroceryItemModel';

@customElement('history-view')
export class HistoryView extends View {

    @state()
    private groceries: GroceryItem[] = [];
    private binder = new Binder(this, GroceryItemModel);

    render() {
        return html`
            <div class="p-m">
                <h3>Grocery List</h3>
                <vaadin-grid .items="${this.groceries}" theme="row-stripes" style="max-width: 400px">
                    <vaadin-grid-column path="name"></vaadin-grid-column>
                    <vaadin-grid-column path="quantity"></vaadin-grid-column>
                </vaadin-grid>
            </div>
        `;
    }

    async firstUpdated() {
        this.groceries = await getAllChangedGrocery();
    }
}
