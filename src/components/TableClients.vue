<template>
  <div>
    <b-container>
      <h3 class="startFlex">Clients</h3>
      <b-row align-h="center"> </b-row>
      <div class="buttonLeft">
        <b-button class="buttonLeft" @click="createClient" size="md"
          >Create Client</b-button
        >
      </div>
      <b-row align-content="between" align-h="between">
        <b-col sm="1" md="3" align-self="start">
          <b-form-input
            v-model="textFilter"
            placeholder="Search"
          ></b-form-input>
        </b-col>
        <b-col sm="1" md="6">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            dark
            aria-controls="clientsTable"
          ></b-pagination>
        </b-col>
      </b-row>
      <b-table
        id="clientsTable"
        :current-page="currentPage"
        :items="filterItems"
        :per-page="perPage"
        :fields="fields"
        :bordered="bordered"
        head-variant="light"
        hover
        :dark="darkTable"
      >
        <template #cell(providers)="row">
          {{ row.item.providers | providerParse }}
        </template>
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Edit
          </b-button>
          |
          <b-button
            size="sm"
            @click="deleteUser(row.item._id)"
            class="mr-1"
            variant="danger"
          >
            Delete
          </b-button>
        </template>
      </b-table>
    </b-container>

    <ModalClient
      :infoModal="infoModal"
      v-on:createFromModal="clientFetch"
      :form="form"
      v-on:closedModal="getClients"
      v-on:deleteFromModal="fetchClientDelete(form._id)"
      :forEdit="infoModal.edit"
    />
  </div>
</template>

<script>

import ModalClient from "@/components/ModalClient";
import {userFunctions} from "@/mixin/userFunctions";
export default {
  created() {
    this.getClients();
  },
  mixins: [userFunctions],
  data() {
    return {
      fields: ["name", "email", "phone", "providers", "actions"],
      perPage: 5,
      bordered: true,
      currentPage: 1,
      darkTable: true,
      textFilter: "",
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    filterItems() {
      return this.items.filter((element) =>
        element.name.toLowerCase().includes(this.textFilter.toLowerCase())
      );
    },
  },
  filters: {
    providerParse(item) {
      let providers = "";
      item.forEach((element, index) => {
        if (index + 1 === item.length) {
          providers += `${element.name}`;
          return;
        }
        providers += `${element.name}, `;
      });

      return providers;
    },
  },
  components: {
    ModalClient,
  },
};
</script>

<style scoped>
.startFlex {
  align-self: flex-start;
  color: white;
}
.paddingItems {
  padding-top: 20px;
  margin-top: 5px;
}
.buttonLeft {
  display: flex;
  flex-direction: row-reverse;
  align-content: flex-end;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>