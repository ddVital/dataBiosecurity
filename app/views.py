from django.shortcuts import render
from django.shortcuts import render
from django.views.generic import DetailView, UpdateView, ListView
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse, reverse_lazy
from django.views.generic.edit import CreateView, UpdateView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import Login_form, Register_form, UserEditForm, SatisfacaoForm

from .models import User, Satisfacao
# Create your views here.
def index(request):
    context = {"user": request.user}

    if request.user.is_authenticated:
        return render(request, "core/index.html", context)
    else:
        return HttpResponseRedirect(reverse("login"))


def handler404(request, exception):
    return render(request, '404.html', status=404)

def handler500(request):
    return render(request, '500.html', status=500)



def satisfacao_view(request):
    if request.method == 'POST':
        form = SatisfacaoForm(request.POST)
        if form.is_valid():
            satisfacao = form.save(commit=False)
            satisfacao.user = request.user
            satisfacao.save()
            return HttpResponseRedirect(reverse("agradecimentos"))
    else:
        form = SatisfacaoForm()
    return render(request, 'core/satisfacao.html', {'form': form})

def satisfacao_success(request):
    return render(request, 'core/agradecimentos.html')


class EditInfoView(UpdateView):
    model = User
    form_class = UserEditForm
    template_name = "core/edit.html"
    success_url = reverse_lazy("index")

def logout_view(request):
    ''' logout the user '''
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def login_view(request):
    ''' Log in '''
    context = {"form": Login_form()}

    if request.method == "POST":
        form = Login_form(request.POST)

        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)

            # Check if authentication successful
            if user is not None:
                login(request, user)
                return HttpResponseRedirect(reverse("index"))
            else:
                context["error"] = "Nome de usuário e/ou senha invalidos."
                return render(request, "core/login.html", context)

    return render(request, "core/login.html", context)


class Register(CreateView):
    ''' Create a new user '''
    model = User
    form_class = Register_form
    template_name = "core/register.html"

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return HttpResponseRedirect(reverse("satisfacao"))


def delete_account(request):
    ''' Delete the user account '''
    user = User.objects.get(username=request.user.username)
    user.delete()
    return HttpResponseRedirect(reverse("login"))