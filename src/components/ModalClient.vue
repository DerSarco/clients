<template>
  <div>
    <b-modal
      ref="modal-form"
      :id="infoModal.id"
      :title="infoModal.title"
      hide-footer
      @hide="clearFormValues"
    >
      <b-form inline @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          class="marginBetween"
          id="input-group-1"
          label="Your Name:"
          label-for="input-2"
        >
          <b-form-input
            id="input-21"
            v-model="form.name"
            :disabled="forEdit"
            placeholder="Enter client name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="marginBetween"
          id="input-group-2"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="marginBetween"
          id="input-group-3"
          label="Phone Number:"
          label-for="input-1"
        >
          <b-form-input
            id="input-3"
            v-model="form.phone"
            type="tel"
            placeholder="Phone Number"
            required
          ></b-form-input>
        </b-form-group>
        <div class="divInline marginBetween">
          <b-form-input
            class="inputSmall"
            v-model="providerText"
            id="input-provider"
            type="text"
            placeholder="Provider"
          ></b-form-input>
          <b-button class="inputSmall" @click="addNewProvider" variant="primary"
            >Create Provider</b-button
          >
        </div>
        <b-form-group label="Select Providers">
          <b-alert :show="showWarningProviders" variant="warning"
            >Select at least one provider.</b-alert
          >
          <b-form-checkbox
            v-for="option in providers"
            v-model="providersSelected"
            :key="option.value"
            :value="option.value"
            name="flavour-3a"
          >
            {{ option.text }}
            <b-icon
              class="iconPress"
              @click="deleteProvider(option.value)"
              icon="trash"
            ></b-icon>
          </b-form-checkbox>
        </b-form-group>
        <div class="actionButtons marginBetween">
          <div class="divInline">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
          <div v-if="infoModal.edit">
            <b-button @click="deleteClientModal" type="reset" variant="danger">Delete User</b-button>
          </div>
        </div>
      </b-form>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }} {{ providersSelected }}</pre>
      </b-card> -->
    </b-modal>
  </div>
</template>


<script>
import {modalFunctions} from '@/mixin/modalFunctions';
export default {
  created() {
    this.getProviders();
  },
  mixins: [modalFunctions],
  props: {
    infoModal: {
      type: Object,
    },
    form: {
      type: Object,
      required: true,
    },
    forEdit: Boolean,
  },
  watch: {
    providersSelected: function () {
      this.showWarningProviders = false;
    },
  },
};
</script>

<style scoped>
.marginBetween {
  margin-top: 25px;
  margin-bottom: 25px;
}
.displayInlineGroup {
  align-content: flex-start;
}
.inputSmall {
  width: 30%;
}
.divInline {
  display: flex;
  flex-direction: row;
}
.buttonsLeft {
  display: flex;
  flex-direction: row-reverse;
}
.iconPress {
  cursor: pointer;
}
.actionButtons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>