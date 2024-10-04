import { getToken } from 'helpers';
import { callExternalApi } from './external-api.service';
// import { useAuth0 } from '@auth0/auth0-react';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

// Fetti

export const passwordlessSendLink = async (body: any) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/passwordless/send-link`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const login = async ({ loginToken = '' }) => {
    const config = {
        url: `${apiServerUrl}/api/passwordless/login?loginToken=${loginToken}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getServices = async () => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/services?populate=thumbnail&sort=sort`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getService = async ({ id = '' }) => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/services/${id.toString()}?populate=thumbnail`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getCustomizations = async ({ serviceId = '' }) => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/customizations?filters[service][id][$eq]=${serviceId.toString()}`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getAddOns = async ({ productId = '' }) => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/add-ons?filters[product][id][$eq]=${productId.toString()}`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const createProduct = async (body: any) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/products`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getProduct = async ({ id = '' }) => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/products/${id.toString()}?populate=event_types`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const updateProduct = async ({ id = '', body = {} }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/products/${id}`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getEventTypes = async () => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/event-types`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getProductsByServiceId = async ({ serviceId = '', userId = '' }) => {
    const token = getToken();

    let headers: any = {
        'content-type': 'application/json',
    };

    if (token) {
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const config = {
        url: `${apiServerUrl}/api/products?filters[service][id][$eq]=${serviceId.toString()}&filters[users_permissions_user][id][$eq]=${userId.toString()}`,
        method: 'GET',
        headers,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const createBusiness = async (body: any) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/businesses`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const updateUser = async ({ id = '', body = {} }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/users/${id}`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const updateBusiness = async ({ id = '', body = {} }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/api/businesses/${id}`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getBusinesses = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/api/businesses?filters[users_permissions_users][id][$eq]=${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getBusinessServices = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/api/businesses/${id}?populate=services`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

// Archive:

interface FilterState {
    page_size: number;
    page: number;
    sort_key: string;
    search_by: string;
    search_key: string;
    sort_by: 'asc' | 'desc' | '';
    account_status: 'ACTIVE' | 'DEACTIVATED' | '';
    driver_ids: string;
    token: string;
    user_id: string;
    installment_type: string;
    limit: number;
    after: number;
    service_zone?: string;
    service_type?: string;
}

interface WalletFilterState {
    limit: number;
    after: number;
    account_type?: string;
    user_id?: string;
}

export const getPublicResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/public`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getProtectedResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/protected`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getAdminResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/admin`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getCustomer = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/customers/${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getCustomerList = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
    account_status = '',
    service_zone = '',
}: FilterState) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
        account_status,
        service_zone,
    });

    const config = {
        url: `${apiServerUrl}/admin/v1/customers?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const deleteCustomer = async ({ id }: { id: string }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/customers/${id}`,
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const updateCustomerStatus = async ({
    id,
    statusValue,
    reason,
}: {
    id: string;
    statusValue: string;
    reason: string;
}) => {
    var requestBody = JSON.stringify({
        account_status: statusValue,
        reason: reason,
    });

    const config = {
        url: `${apiServerUrl}/admin/v1/customers/${id}/account-status`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: requestBody,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getDriver = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getTripCancellationReasons = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/v1/trips/${id}/cancelation_reasons`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const updateTrip = async ({ id, body }: { id: string; body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/v1/trips/operator/${id}`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getTrip = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/v1/trips/${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getVehicles = async ({ user_id = '' }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/${user_id}/vehicles`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getDriversWallet = async ({ id = '' }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/wallet/${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getDriversWalletOperator = async ({ user_id = '', limit = 10, after = 0 }) => {
    const queryParams = new URLSearchParams({
        limit: String(limit),
        after: String(after),
        user_id: user_id,
    });
    const config = {
        url: `${apiServerUrl}/wallet/wallets?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const adjustBalance = async ({ body }: { body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/wallet/wallets`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getTripHistory = async ({ user_id = '', user_type = '', page_size = 10, page = 1 }) => {
    let offset = (page - 1) * page_size;
    const config = {
        url: `${apiServerUrl}/v1/trips/operator/history?user_id=${user_id}&user_type=${user_type}&limit=${page_size}&offset=${offset}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getDriversTripHistory = async ({
    id = '',
    page_size = 10,
    page = 1,
    status = '',
    trip_date = '',
    start_date = '',
    end_date = '',
}) => {
    let offset = (page - 1) * page_size;
    const queryParams = new URLSearchParams({
        user_id: id,
        user_type: 'driver',
        offset: String(offset),
        limit: String(page_size),
        status,
        trip_date,
        start_date,
        end_date,
    });
    const config = {
        url: `${apiServerUrl}/v1/trips/operator/history?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getCustomersTripHistory = async ({
    id = '',
    page_size = 10,
    page = 1,
    status = '',
    trip_date = '',
    start_date = '',
    end_date = '',
}) => {
    let offset = (page - 1) * page_size;
    const queryParams = new URLSearchParams({
        user_id: id,
        user_type: 'customer',
        offset: String(offset),
        limit: String(page_size),
        status,
        trip_date,
        start_date,
        end_date,
    });

    const config = {
        url: `${apiServerUrl}/v1/trips/operator/history?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getDriversList = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
    driver_ids = '',
    account_status = '',
    service_zone = '',
    service_type = '',
}: FilterState) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
        driver_ids,
        account_status,
        service_zone,
        service_type,
    });
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const updateDriverTnvStatus = async ({ id = '', checked = Boolean }) => {
    var raw = JSON.stringify({
        tnv_violation: checked,
    });
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/${id}/tnv-violation`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const updateDriver = async ({ id = '', body }: { id: string; body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/${id}`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const generateVouchers = async (body: any) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/wallet/vouchers/generate`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: data?.status,
        fileUrl: data?.file_url,
        vouchers: data?.vouchers,
        error,
    };
};

export const updateCustomer = async ({ id = '', body }: { id: string; body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/admin/v1/customers/${id}`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getDriverDevices = async ({ id }: { id: string }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers/${id}/devices`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getCustomerDevices = async ({ id }: { id: string }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/customers/${id}/devices`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getFleets = async () => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const updateFleetPriority = async ({ id, values }: { id: string; values: any }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets/${id}`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: values,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const replaceFleetDrivers = async ({ id, drivers }: { id: string; drivers: {} }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets/${id}/drivers`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: { drivers: drivers },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const addFleetDrivers = async ({ id, drivers }: { id: string; drivers: {} }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets/${id}/drivers`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: { drivers: drivers },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getFleet = async ({ id }: { id: string }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets/${id}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const removeFleetDrivers = async ({ id, drivers }: { id: string; drivers: {} }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/fleets/${id}/drivers`,
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
        data: { drivers: drivers },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const approveDevice = async ({ deviceId }: { deviceId: string }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/devices/${deviceId}/approve`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getTransactionsList = async ({
    limit = 10,
    after = 0,
    account_type = '',
    user_id = '',
}: WalletFilterState) => {
    const queryParams = new URLSearchParams({
        limit: String(limit),
        after: String(after),
        accType: account_type,
        user_id: user_id,
    });
    const config = {
        url: `${apiServerUrl}/wallet/wallets/transactions?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getInstallmentsList = async ({
    page_size = 10,
    page = 1,
    token = '',
    user_id = '',
    installment_type = '',
}: FilterState) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        token,
        user_id,
        type: installment_type,
    });
    const config = {
        url: `${apiServerUrl}/wallet/installments?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getIncentivesList = async ({ limit = 10, after = 0, page = 1, token = '', user_id = '' }: FilterState) => {
    const queryParams = new URLSearchParams({
        after: String(after),
        page: String(page),
        limit: String(limit),
        user_id,
    });
    const config = {
        url: `${apiServerUrl}/wallet/incentives?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const getScheduleList = async ({ token, id }: { token: string; id: string }) => {
    const config = {
        url: `${apiServerUrl}/wallet/installments/${id}/schedules`,
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const createInstallment = async ({ token, res }: { token: string; res: any }) => {
    var requestBody = res;
    const config = {
        url: `${apiServerUrl}/wallet/installments`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: requestBody,
    };
    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: error?.status,
        error,
    };
};

export const createBatchInstallment = async ({ token, res }: { token: string; res: any }) => {
    var requestBody = res;
    const config = {
        url: `${apiServerUrl}/wallet/installments/batch`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: requestBody,
    };
    const { data, error } = await callExternalApi({ config });
    return {
        data: data,
        status: error?.status || 'success',
        error,
    };
};

export const awardIncentives = async ({ token, res }: { token: string; res: any }) => {
    let requestBody = res;
    const config = {
        url: `${apiServerUrl}/wallet/incentives`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: requestBody,
    };
    const { data, error } = await callExternalApi({ config });
    return {
        data: data?.data || null,
        status: error?.status,
        error,
    };
};

export const getDailyStatsBookings = async ({
    id,
    start_date,
    end_date,
}: {
    id: string;
    start_date: string;
    end_date: string;
}) => {
    const config = {
        url: `${apiServerUrl}/drivers/${id}/daily-bookings/performance-stats?start_date=${start_date}&end_date=${end_date}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    const dataResponse = {
        data: {
            dailyBookings: [
                {
                    label: 'Mon',
                    totalCompletedBookings: 35,
                    totalHoursSpent: 35.5,
                    date: '2023-07-31',
                },
                {
                    label: 'Tue',
                    totalCompletedBookings: 67,
                    totalHoursSpent: 35.5,
                    date: '2023-08-01',
                },
                {
                    label: 'Wed',
                    totalCompletedBookings: 45,
                    totalHoursSpent: 35.5,
                    date: '2023-08-02',
                },
                {
                    label: 'Thu',
                    totalCompletedBookings: 36,
                    totalHoursSpent: 35.5,
                    date: '2023-08-03',
                },
                {
                    label: 'Fri',
                    totalCompletedBookings: 87,
                    totalHoursSpent: 35.5,
                    date: '2023-08-04',
                },
                {
                    label: 'Sat',
                    totalCompletedBookings: 33,
                    totalHoursSpent: 35.5,
                    date: '2023-08-05',
                },
                {
                    label: 'Sun',
                    totalCompletedBookings: 55,
                    totalHoursSpent: 35.5,
                    date: '2023-08-06',
                },
            ],
        },
    };

    return {
        data: dataResponse?.data || null,
        status: data?.status,
        error,
    };
};

export const getDailyStatsEarnings = async ({
    id,
    start_date,
    end_date,
}: {
    id: string;
    start_date: string;
    end_date: string;
}) => {
    const config = {
        url: `${apiServerUrl}/drivers/${id}/daily-earnings/performance-stats?start_date=${start_date}&end_date=${end_date}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const dataResponse = {
        data: {
            dailyNetEarnings: [
                { label: 'Mon', date: '2023-07-31', totalEarnings: 15000 },
                { label: 'Tue', date: '2023-08-01', totalEarnings: 13000 },
                { label: 'Wed', date: '2023-08-02', totalEarnings: 11500 },
                { label: 'Thu', date: '2023-08-03', totalEarnings: 4500 },
                { label: 'Fri', date: '2023-08-04', totalEarnings: 4600 },
                { label: 'Sat', date: '2023-08-05', totalEarnings: 14900 },
                { label: 'Sun', date: '2023-08-06', totalEarnings: 12300 },
            ],
            // Add more daily data as needed
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: dataResponse?.data || null,
        status: data?.status,
        error,
    };
};

export const getWeeklyStatsBookings = async ({
    id,
    start_date,
    end_date,
}: {
    id: string;
    start_date: string;
    end_date: string;
}) => {
    const config = {
        url: `${apiServerUrl}/drivers/${id}/daily-earnings/performance-stats?start_date=${start_date}&end_date=${end_date}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const dataResponse = {
        data: {
            weeklyBookings: [
                {
                    week: 1,
                    dateStart: '2023-07-31',
                    dateEnd: '2023-08-06',
                    totalBookings: 250,
                    totalHoursSpent: 130,
                    data: [
                        { label: 'M', totalCompletedBookings: 33, totalHoursSpent: 35.5 },
                        { label: 'T', totalCompletedBookings: 25, totalHoursSpent: 35.5 },
                        { label: 'W', totalCompletedBookings: 66, totalHoursSpent: 35.5 },
                        { label: 'T', totalCompletedBookings: 24, totalHoursSpent: 35.5 },
                        { label: 'F', totalCompletedBookings: 68, totalHoursSpent: 35.5 },
                        { label: 'S', totalCompletedBookings: 37, totalHoursSpent: 35.5 },
                        { label: 'S', totalCompletedBookings: 55, totalHoursSpent: 35.5 },
                    ],
                },
                // Add more weekly data as needed
            ],
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: dataResponse?.data || null,
        status: data?.status,
        error,
    };
};

export const getWeeklyStatsEarnings = async ({ id, week }: { id: string; week: number }) => {
    const config = {
        url: `${apiServerUrl}/drivers/{id}/weekly-earnings/performance-stats?week=${week}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const dataResponse = {
        data: {
            date_start: '2023-07-31',
            date_end: '2023-08-06',
            total_net_earnings: 15000,
            performance_history: [
                {
                    label: 'Week 29',
                    data: [
                        { label: 'July 16, Sun', totalEarnings: 12600, day: 'S' },
                        { label: 'July 17, Mon', totalEarnings: 12600, day: 'M' },
                        { label: 'July 18, Tue', totalEarnings: 12600, day: 'T' },
                        { label: 'July 19, Wed', totalEarnings: 12600, day: 'W' },
                        { label: 'July 20, Thu', totalEarnings: 12600, day: 'T' },
                        { label: 'July 21, Fri', totalEarnings: 12600, day: 'F' },
                        { label: 'July 22, Sat', totalEarnings: 12600, day: 'S' },
                    ],
                },
                {
                    label: 'Week 28',
                    data: [
                        { label: 'July 16, Sun', totalEarnings: 12600, day: 'S' },
                        { label: 'July 17, Sun', totalEarnings: 12600, day: 'M' },
                        { label: 'July 18, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 19, Sun', totalEarnings: 12600, day: 'W' },
                        { label: 'July 20, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 21, Sun', totalEarnings: 12600, day: 'F' },
                        { label: 'July 22, Sun', totalEarnings: 12600, day: 'S' },
                    ],
                },
                {
                    label: 'Week 27',
                    data: [
                        { label: 'July 16, Sun', totalEarnings: 12600, day: 'S' },
                        { label: 'July 17, Sun', totalEarnings: 12600, day: 'M' },
                        { label: 'July 18, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 19, Sun', totalEarnings: 12600, day: 'W' },
                        { label: 'July 20, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 21, Sun', totalEarnings: 12600, day: 'F' },
                        { label: 'July 22, Sun', totalEarnings: 12600, day: 'S' },
                    ],
                },
                {
                    label: 'Week 26',
                    data: [
                        { label: 'July 16, Sun', totalEarnings: 12600, day: 'S' },
                        { label: 'July 17, Sun', totalEarnings: 12600, day: 'M' },
                        { label: 'July 18, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 19, Sun', totalEarnings: 12600, day: 'W' },
                        { label: 'July 20, Sun', totalEarnings: 12600, day: 'T' },
                        { label: 'July 21, Sun', totalEarnings: 12600, day: 'F' },
                        { label: 'July 22, Sun', totalEarnings: 12600, day: 'S' },
                    ],
                },
            ],
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: dataResponse?.data || null,
        status: data?.status,
        error,
    };
};

export const inviteOperator = async ({ values }: { id: string; values: any }) => {
    const config = {
        url: `${apiServerUrl}/admin/v1/operators`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: values,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data?.data || null,
        status: data?.status,
        error,
    };
};

export const getOperatorsList = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
}: FilterState) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
    });
    const config = {
        url: `${apiServerUrl}/admin/v1/operators?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getUserManagementAuditLogs = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
    operator_id = '',
    data_type = '',
    data_change = '',
}: any) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
        operator_id,
        data_type,
        data_change,
    });
    const config = {
        url: `${apiServerUrl}/admin/v1/audit-logs?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getFinanceAuditLogs = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
    operator_id = '',
    data_type = '',
    data_change = '',
}: any) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
        operator_id,
        data_type,
        data_change,
    });
    const config = {
        url: `${apiServerUrl}/wallet/auditlogs?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getTripsAuditLogs = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    sort_key = '',
    sort_by = '',
    operator_id = '',
    data_type = '',
    data_change = '',
}: any) => {
    const queryParams = new URLSearchParams({
        page: String(page),
        page_size: String(page_size),
        search_by,
        search_key,
        sort_key,
        sort_by,
        operator_id,
        data_type,
        data_change,
    });
    const config = {
        url: `${apiServerUrl}/wallet/auditlogs?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getAllFareConfig = async () => {
    const config = {
        url: `${apiServerUrl}/price/v1/fare-config/all`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const saveFareConfig = async ({ body }: { body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/price/v1/fare-config/`,
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const createFareConfig = async ({ body }: { body: any }) => {
    var raw = JSON.stringify(body);
    const config = {
        url: `${apiServerUrl}/price/v1/fare-config/`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getAllSurchargeConfig = async () => {
    const config = {
        url: `${apiServerUrl}/price/v1/surcharge/`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };

    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        status: data?.status,
        error,
    };
};
export const createSurchargeConfig = async ({ body }: { body: any }) => {
    var raw = JSON.stringify(body);
    console.log(raw, 'test it bosy raw');
    const config = {
        url: `${apiServerUrl}/price/v1/surcharge/`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const updateSurchargeConfig = async ({ body }: { body: any }) => {
    var raw = JSON.stringify(body);
    console.log(raw, 'test it bosy raw');
    const config = {
        url: `${apiServerUrl}/price/v1/surcharge/`,
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        data: raw,
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        status: data?.status,
        error,
    };
};

export const getVouchersList = async ({
    page_size = 10,
    page = 1,
    search_by = '',
    search_key = '',
    created_at = '',
    expiry_at = '',
}: any) => {
    const queryParams = new URLSearchParams({
        page_size: String(page_size),
        page: String(page),
        search_by,
        search_key,
        created_at: created_at ? created_at.format('YYYY-MM-DD') : '',
        expires_at: expiry_at ? expiry_at.format('YYYY-MM-DD') : '',
    });
    const config = {
        url: `${apiServerUrl}/wallet/vouchers/transactions?${queryParams.toString()}`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };
    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getInternalBalances = async () => {
    const config = {
        url: `${apiServerUrl}/wallet/wallet-balances`,
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    };
    const { data, error } = await callExternalApi({ config });
    return {
        data: data || null,
        error,
    };
};

export const createDriver = async ({ token, res }: { token: string; res: any }) => {
    var requestBody = res;
    const config = {
        url: `${apiServerUrl}/admin/v1/drivers`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: requestBody,
    };
    const { data, error } = await callExternalApi({ config });
    return {
        data: data,
        status: error?.status || 'success',
        error,
    };
};
