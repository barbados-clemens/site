const base = 'https://api.svelte.dev';
export async function todoApi(method: string, resource: string, data?: Record<string, unknown>) {
  return fetch(`${base}/${resource}`, {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body: data && JSON.stringify(data)
  });
}
// TODO(caleb): type this stuff
export async function getTodoHandler({ locals }) {
  const response = await todoApi('get', `todos/${locals.userid}`);

  if (response.status === 404) {
    // user hasn't created a todo list.
    // start with an empty array
    return {
      body: {
        todos: []
      }
    };
  }

  if (response.status === 200) {
    return {
      body: {
        todos: await response.json()
      }
    };
  }

  return {
    status: response.status
  };
}

export async function postRequestHandler({ request, locals }) {
  const form = await request.formData();

  await todoApi('post', `todos/${locals.userid}`, {
    text: form.get('text')
  });

  return {};
}

const redirect = {
  status: 303,
  headers: {
    location: '/todos'
  }
};

export async function patchRequestHandler({ request, locals }) {
  const form = await request.formData();

  await todoApi('patch', `todos/${locals.userid}/${form.get('uid')}`, {
    text: form.has('text') ? form.get('text') : undefined,
    done: form.has('done') ? !!form.get('done') : undefined
  });

  return redirect;
};

export async function deleteRequestHandler({ request, locals }) {
  const form = await request.formData();

  await todoApi('delete', `todos/${locals.userid}/${form.get('uid')}`);

  return redirect;
};
